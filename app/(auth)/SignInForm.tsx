import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/Input';
import { Button } from '@/components/Button';
import { Text, View } from 'react-native';
import { useState } from 'react';
import { client } from '@/lib/client';
import { useAuth } from '@/lib/auth';
import axios from 'axios';
import { router } from 'expo-router';
import { setUser } from '@/lib/user';

const formSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

const SignInForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const [loading, setLoading] = useState(false);
    const [errorFromApi, setError] = useState<string | null>(null);
    const { signIn } = useAuth();

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            const response = await client.post('/auth/login', {
                email: data.email,
                password: data.password,
            });
            if (response.data) {
                signIn({
                    access: response.data.token,
                    refresh: 'refresh-token',
                });
                setUser(response.data);
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
        <View className="w-full gap-2">
            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextInput
                        placeholder="Enter your email"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        inputStyles="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-white"
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
                        inputStyles="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 text-white"
                        containerStyles="mb-4"
                        labelStyles="text-lg font-semibold"
                        errorMessage={errors.password?.message}
                        errorStyles="text-sm text-red-500"
                        isPassword
                    />
                )}
            />
            <View>
                {errorFromApi && <Text className="text-red-500 text-sm mb-2">{errorFromApi}</Text>}
            </View>

            <Button
                loading={loading}
                text="Sign in"
                onPress={handleSubmit(onSubmit)}
                className="bg-white text-white w-full flex-row justify-center
                items-center h-12 rounded-[9999px]"
                fontStyling="text-lg font-semibold "
            />
        </View>
    );
};

export default SignInForm;
