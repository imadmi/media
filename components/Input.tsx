import { cn } from '@/lib/utils';
import React from 'react';
import { TextInput, View, Text, TextInputProps, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface CustomTextInputProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    inputStyles?: string;
    containerStyles?: string;
    labelStyles?: string;
    errorMessage?: string;
    errorStyles?: string;
    isPassword?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    label,
    placeholder = '',
    value,
    onChangeText,
    inputStyles = '',
    containerStyles = '',
    labelStyles = '',
    errorMessage = '',
    errorStyles = '',
    isPassword = false,
    ...props
}) => {
    const [isSecure, setIsSecure] = React.useState(isPassword);

    return (
        <View className={cn(`w-full ${containerStyles}`)}>
            {label && <Text className={cn(`text-gray-800 mb-1 ${labelStyles}`)}>{label}</Text>}
            
            <View className="relative w-full">
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPassword && isSecure}
                    className={cn(
                        `border rounded-lg p-3 pr-10 text-gray-900 ${inputStyles} placeholder:text-gray-400`
                    )}
                    {...props}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setIsSecure(!isSecure)}
                        className="absolute right-4 top-3"
                    >
                        <Feather name={isSecure ? 'eye-off' : 'eye'} size={20} color="gray" />
                    </TouchableOpacity>
                )}
            </View>

            {errorMessage ? (
                <Text className={cn(`text-red-500 mt-1 ${errorStyles}`)}>{errorMessage}</Text>
            ) : null}
        </View>
    );
};

export default CustomTextInput;