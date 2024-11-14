import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { cn } from '@/lib/utils';

type CheckboxProps = {
    checked?: boolean;
    onToggle?: (checked: boolean) => void;
    label?: string;
    labelPosition?: 'left' | 'right';
    checkboxSize?: number;
    checkedColor?: string;
    uncheckedColor?: string;
    iconColor?: string;
    labelStyles?: string;
    containerStyles?: string;
    icon?: 'check' | 'check-circle' | 'square';
    errorMessage?: string;
    errorStyles?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
    checked = false,
    onToggle,
    label,
    labelPosition = 'right',
    checkboxSize = 24,
    checkedColor = 'bg-black',
    uncheckedColor = 'bg-white',
    iconColor = 'white',
    labelStyles = '',
    containerStyles = '',
    icon = 'check',
    errorMessage,
    errorStyles = 'text-sm text-red-500',
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handlePress = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onToggle) onToggle(newChecked);
    };

    return (
        <View className={cn(containerStyles)}>
            <TouchableOpacity
                onPress={handlePress}
                activeOpacity={0.7}
                className="flex flex-row items-center"
            >
                {labelPosition === 'left' && label && (
                    <Text className={cn(`mr-2 text-gray-700`, labelStyles)}>{label}</Text>
                )}
                <View
                    style={{
                        height: checkboxSize,
                        width: checkboxSize,
                    }}
                    className={cn(
                        `rounded ${
                            isChecked ? checkedColor : uncheckedColor
                        } justify-center items-center border border-white`
                    )}
                >
                    {isChecked && (
                        <Feather name={icon} size={checkboxSize * 0.7} color={iconColor} />
                    )}
                </View>
                {labelPosition === 'right' && label && (
                    <Text className={cn(`ml-2 text-gray-700`, labelStyles)}>{label}</Text>
                )}
            </TouchableOpacity>
            {/* Render the error message if it exists */}
            {errorMessage && <Text className={cn(`mt-1`, errorStyles)}>{errorMessage}</Text>}
        </View>
    );
};

export default Checkbox;
