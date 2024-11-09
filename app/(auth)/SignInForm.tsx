
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomTextInput from '@/components/Input';
import { Button } from '@/components/Button';
import { View } from 'react-native';

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
    });

    const onSubmit = (data: FormData) => {
        console.log('Form Data:', data);
        // Implement sign-in logic here
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
            <Button
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