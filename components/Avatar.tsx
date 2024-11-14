import React, { useState } from 'react';
import { Image, View, Text } from 'react-native';
import { cn } from '@/lib/utils';

type AvatarProps = {
    src?: string;
    fallback?: string;
    className?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, fallback = 'A', className = '' }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <View
            className={cn(
                'flex justify-center items-center border border-gray-600 rounded-full',
                className
            )}
        >
            {!imageError && src ? (
                <Image
                    source={{ uri: src }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 9999,
                    }}
                    onError={handleImageError}
                />
            ) : (
                <Text className="text-center text-white">{fallback}</Text>
            )}
        </View>
    );
};

export default Avatar;
