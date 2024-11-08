import { cn } from '@/lib/utils';
import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

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
    ...props
}) => {
    return (
        <View className={cn(`w-full ${containerStyles}`)}>
            {label && <Text className={cn(`text-gray-800 mb-1 ${labelStyles}`)}>{label}</Text>}
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className={cn(
                    `border rounded-lg p-3 text-gray-900 ${inputStyles} placeholder:text-gray-400`
                )}
                {...props}
            />
            {errorMessage ? (
                <Text className={cn(`text-red-500 mt-1 ${errorStyles}`)}>{errorMessage}</Text>
            ) : null}
        </View>
    );
};

export default CustomTextInput;
