import { cn } from '@/lib/utils';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ActivityIndicator,
} from 'react-native';

type ButtonProps = TouchableOpacityProps & {
    text: string;
    startIcon?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    fontStyling?: string;
    loading?: boolean;
    className?: string;
};

export const Button: React.FC<ButtonProps> = ({
    text,
    onPress,
    startIcon,
    disabled = false,
    fontStyling,
    loading = false,
    className,
    ...props
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            className={cn(
                'rounded-lg flex flex-row items-center',
                disabled || loading ? 'opacity-50' : 'opacity-100',
                className
            )}
            {...props}
        >
            {loading && (
                <View className={cn('mr-2')}>
                    <ActivityIndicator size="small" color="grey" />
                </View>
            )}
            {startIcon && !loading && <View className={cn('mr-2')}>{startIcon}</View>}
            <Text className={cn('font-bold', fontStyling)}>{text}</Text>
        </TouchableOpacity>
    );
};
