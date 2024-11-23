import React, { useState } from 'react';
import { LayoutChangeEvent, ScrollView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MotiView } from 'moti';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import TopTabs from '../../utils/TopTabs';
import usescrollStore from '@/store/scrollStore';
import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';

function Profile() {
    const scroll = usescrollStore((state) => state.scroll);
    const avatarSize = Math.max(50, 100 - scroll / 2);
    const translateY =
        Math.max(scroll / 10, -avatarSize / 2) < avatarSize / 2 - 24
            ? Math.max(scroll / 20, -avatarSize / 2) - avatarSize / 2 + 24
            : 0;
    const [viewHeight, setViewHeight] = useState(0);
    const [viewHeightscroll, setViewHeightscroll] = useState(0);
    const [viewHeightscrollafter, setViewHeightscrollafter] = useState(0);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        if (translateY < 0) {
            setViewHeight(height);
            setViewHeightscroll(scroll);
        }
        if (translateY >= 0) {
            setViewHeightscrollafter(scroll);
        }
    };

    const dynamicHeight = viewHeight - (-viewHeightscroll + viewHeightscrollafter);

    return (
        <View className="bg-black flex-1">
            <DynamicHeader scrollPosition={scroll} />
            <View
                className="relative"
                style={{
                    height: translateY >= 0 ? dynamicHeight : 'auto',
                    overflow: translateY >= 0 ? 'hidden' : 'visible',
                }}
                onLayout={handleLayout}
            >
                <View
                    style={{ position: translateY >= 0 ? 'absolute' : 'relative' }}
                    className=" bottom-0 w-full  px-2"
                >
                    <ProfileSection avatarSize={avatarSize} translateY={translateY} /> 
                </View>
            </View>
            <TopTabs />
        </View>
    );
}

const ProfileSection = ({
    avatarSize,
    translateY,
}: {
    avatarSize: number;
    translateY: number;
}) => (
    <View
        style={{ position: translateY >= 0 ? 'absolute' : 'relative' }}
        className="bottom-0 w-full px-2"
    >
        <View className="flex-row justify-between h-12">
            <View
                className="border-2 border-black rounded-full overflow-hidden ml-3 mt-2"
                style={{
                    width: avatarSize,
                    height: avatarSize,
                    alignSelf: 'center',
                    transform: [{ translateY }],
                }}
            >
                <Avatar fallback="A" src="https://i.pravatar.cc" />
            </View>
            <View>
                <Button
                    text="Edit Profile"
                    onPress={() => {}}
                    className="text-white p-2 border-2 border-gray-400 rounded-full mr-3 mt-2 px-4"
                    fontStyling="text-white"
                />
            </View>
        </View>
        <ScrollView className="mt-3">
            <Text className="text-white font-bold text-xl">Imad Mimouni</Text>
            <Text className="text-white">@Imadmi</Text>
            <Text className="text-white mt-4">Joined October, 2011</Text>
            <Text className="text-white">Born September 10, 2011</Text>
            <Text className="text-white mt-2">66 Following • 11 Followers</Text>
        </ScrollView>
    </View>
);


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
            <Profile />
        </NavigationContainer>
    );
}
