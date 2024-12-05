import { useForm, Controller, set } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/Input';
import { Button } from '@/components/Button';
import { Text, View } from 'react-native';
import Checkbox from '@/components/Checkbox';
import { client } from '@/lib/client';
import { useState } from 'react';
import axios from 'axios';
import { setItem } from '@/lib/storage';
import { useAuth } from '@/lib/auth';
import { router } from 'expo-router';
import { setUser } from '@/lib/user';

const formSchema = z
    .object({
        fullName: z
            .string()
            .max(50, 'Full name must be less than 50 characters')
            .nonempty('Full name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        checkBox: z.boolean().optional(),
    })
    .refine((data) => data.checkBox === true, {
        message: 'You must agree to the terms and conditions',
        path: ['checkBox'],
    });
type FormData = z.infer<typeof formSchema>;

const SignupForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            checkBox: false,
        },
    });
    const [loading, setLoading] = useState(false);
    const [errorFromApi, setError] = useState<string | null>(null);
    const { signIn } = useAuth();

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            const response = await client.post('/auth/signup', {
                fullName: data.fullName,
                email: data.email,
                password: data.password,
            });
            if (response.data.success) {
                signIn({
                    access: response.data.userWithAccessToken.token,
                    refresh: 'refresh-token',
                });
                setUser(response.data.userWithAccessToken);
                router.push('/tabs');
                return;
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <View className="w-full gap-3 mt-2">
            <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextInput
                        placeholder="Enter your full name"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        inputStyles="border-gray-300 focus:border-blue-500 
                        focus:ring focus:ring-blue-200 text-white"
                        containerStyles="mb-4"
                        labelStyles="text-lg font-semibold"
                        errorMessage={errors.fullName?.message}
                        errorStyles="text-sm text-red-500"
                    />
                )}
            />
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextInput
                        placeholder="Enter your email"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        inputStyles="border-gray-300 focus:border-blue-500 
                        focus:ring focus:ring-blue-200 text-white"
                        containerStyles="mb-4"
                        labelStyles="text-lg font-semibold"
                        errorMessage={errors.email?.message}
                        errorStyles="text-sm text-red-500"
                    />
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextInput
                        placeholder="Enter your password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        inputStyles="border-gray-300 focus:border-blue-500 
                        focus:ring focus:ring-blue-200 text-white"
                        containerStyles="mb-4"
                        labelStyles="text-lg font-semibold"
                        errorMessage={errors.password?.message}
                        errorStyles="text-sm text-red-500"
                        isPassword
                    />
                )}
            />
            <Controller
                control={control}
                name="checkBox"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox
                        checked={value}
                        onToggle={onChange}
                        label="I agree to the Terms of Service"
                        labelStyles="text-white"
                        containerStyles="mb-4"
                        errorMessage={errors.checkBox?.message}
                    />
                )}
            />
            <Button
                loading={loading}
                text="Sign up"
                onPress={handleSubmit(onSubmit)}
                className="bg-white text-white w-full flex-row justify-center 
                items-center h-12 rounded-[9999px]"
                fontStyling="text-lg font-semibold"
            />
            <View>
                {errorFromApi && <Text className="text-red-500 text-sm mt-2">{errorFromApi}</Text>}
            </View>
        </View>
    );
};

export default SignupForm;
