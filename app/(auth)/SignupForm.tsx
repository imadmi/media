import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/Input';
import { Button } from '@/components/Button';
import { View } from 'react-native';
import Checkbox from '@/components/Checkbox';

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

    const onSubmit = (data: FormData) => {
        console.log('Form Data:', data);
        // Implement sign-in logic here
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
                text="Sign up"
                onPress={handleSubmit(onSubmit)}
                className="bg-white text-white w-full flex-row justify-center 
                items-center h-12 rounded-[9999px]"
                fontStyling="text-lg font-semibold"
            />
        </View>
    );
};

export default SignupForm;
