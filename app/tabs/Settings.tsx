import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MotiView } from 'moti';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import TopTabs from '../profileTabs/TopTabs';
import usescrollStore from '@/store/scrollStore';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';

function Settings() {
    const scroll = usescrollStore((state) => state.scroll);
    const avatarSize = Math.max(50, 100 - scroll / 2);
    const translateY =
        Math.max(scroll / 10, -avatarSize / 2) < avatarSize / 2
            ? Math.max(scroll / 20, -avatarSize / 2) - avatarSize / 2 + 24
            : 0;
    return (
        <View className="bg-black flex-1">
            <DynamicHeader scrollPosition={scroll} />
            <View className="relative px-2 h-[200px]">
                <View className="flex-row justify-between h-12">
                    <View
                        className="border-2 border-black rounded-full overflow-hidden ml-3 mt-2"
                        style={{
                            width: avatarSize,
                            height: avatarSize,
                            alignSelf: 'center',
                            transform: [{ translateY: translateY }],
                        }}
                    >
                        <Avatar fallback="A" src="https://i.pravatar.cc" className="" />
                    </View>
                    <View>
                        <Button
                            text="Edit Profile"
                            onPress={() => {}}
                            className=" text-white p-2 border-2 border-gray-400
                            rounded-full mr-3 mt-2 px-4"
                            fontStyling="text-white"
                        />
                    </View>
                </View>
                <View className="mt-2">
                    <Text className="text-white font-bold text-xl">Imad Mimouni</Text>
                    <Text className="text-white">@Imadmi</Text>
                    <Text className="text-white mt-4">Joined october, 2011</Text>
                    <Text className="text-white ">Born septembre 10, 2011</Text>
                    <Text className="text-white mt-2">66 Following 11 Follwers</Text>
                </View>
            </View>
            <TopTabs />
        </View>
    );
}

const DynamicHeader = ({ scrollPosition }: { scrollPosition: number }) => {
    const maxHeaderHeight = 180 + Constants.statusBarHeight;
    const minHeaderHeight = 70 + Constants.statusBarHeight;
    const headerHeight =
        scrollPosition < minHeaderHeight ? maxHeaderHeight - scrollPosition : minHeaderHeight;

    return (
        <MotiView
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            from={{ height: maxHeaderHeight }}
            animate={{ height: headerHeight }}
            transition={{
                type: 'timing',
                duration: 200,
            }}
            className="relative"
        >
            <Image
                source={{ uri: 'https://i.pravatar.cc' }}
                style={{
                    height: '100%',
                    width: '100%',
                }}
            />
            <BlurView
                intensity={maxHeaderHeight - headerHeight}
                tint="dark"
                className="absolute w-full h-full"
            />
        </MotiView>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Settings />
        </NavigationContainer>
    );
}
