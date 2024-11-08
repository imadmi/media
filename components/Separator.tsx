import React from 'react';
import { View } from 'react-native';
import { cn } from '@/lib/utils';

type SeparatorProps = {
    vertical?: boolean;
    thickness?: number;
    className?: string;
};

export const Separator: React.FC<SeparatorProps> = ({
    vertical = false,
    thickness = 1,
    className = 'bg-gray-300',
}) => {
    return (
        <View
            className={cn(
                vertical ? 'h-full' : 'w-full',
                className
            )}
            style={vertical ? { width: thickness } : { height: thickness }}
        />
    );
};

export default Separator;