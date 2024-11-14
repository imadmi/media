import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { MotiView } from 'moti';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';

function Settings() {
    const [scrollPosition, setScrollPosition] = useState(0);

    return (
        <View className="bg-black flex-1">
            <DynamicHeader scrollPosition={scrollPosition} />
            <ScrollView
                onScroll={(event) => {
                    const scrollY = event.nativeEvent.contentOffset.y;
                    setScrollPosition(scrollY);
                }}
                scrollEventThrottle={1} // Adjusts frequency of scroll updates (good for smooth animations)
            >
                {/* Content to scroll through */}
                <View className="p-4">
                    {[...Array(200).keys()].map((item) => (
                        <Text key={item} className="text-white text-lg my-2">
                            Scroll Item {item + 1}
                        </Text>
                    ))}
                </View>
            </ScrollView>
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

export default Settings;
