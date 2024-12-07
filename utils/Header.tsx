import React from 'react';
import { View } from 'react-native';
import useHeaderStore from '@/store/showHeaderStore';
import { Image } from 'expo-image';
import Avatar from '@/components/Avatar';
import { MotiView } from 'moti';
import { getUser } from '@/lib/user';

export const Header = () => {
    const showHeader = useHeaderStore((state) => state.showHeader);

    return (
        <MotiView
            style={{
                overflow: 'hidden',
            }}
            from={{
                height: showHeader ? 0 : 60,
                opacity: showHeader ? 0 : 1,
            }}
            animate={{
                height: showHeader ? 60 : 0,
                opacity: showHeader ? 1 : 0,
            }}
            transition={{
                type: 'timing',
                duration: 300,
            }}
            className="bg-black border-b border-gray-700 flex-row items-center justify-between px-4"
        >
            <View className="flex-row items-center justify-center pl-1">
                <Avatar src={getUser()?.picture} className="h-8 w-8" />
            </View>
            <View className="justify-center items-center h-12">
                <Image
                    source={require('../assets/images/media-letter-logo-template-vector.svg')}
                    style={{
                        height: 120,
                        width: 180,
                        tintColor: 'white',
                    }}
                />
            </View>
            <View className="size-8" />
        </MotiView>
    );
};
