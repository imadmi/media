import { cn } from '@/lib/utils';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import '../global.css';

type ButtonProps = TouchableOpacityProps & {
    text: string;
    startIcon?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    fontStyling?: string;
};

export const Button: React.FC<ButtonProps> = ({
    text,
    onPress,
    startIcon,
    disabled = false,
    fontStyling,
    ...props
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            className={cn(
                'rounded-lg flex flex-row items-center',
                disabled ? 'opacity-50' : 'opacity-100'
            )}
            {...props}
        >
            {startIcon && <View className={cn('mr-2')}>{startIcon}</View>}
            <Text className={cn('font-bold', fontStyling)}>{text}</Text>
        </TouchableOpacity>
    );
};
