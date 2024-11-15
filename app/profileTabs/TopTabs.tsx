import React, { Dispatch, SetStateAction } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useScrollStore from '@/store/scrollStore';

const Tab = createMaterialTopTabNavigator();

const HomeProfile = () => {
    const setScroll = useScrollStore((state) => state.setScroll);

    return (
        <View className="flex-1 justify-center items-center bg-black">
            <Text>Home Screen</Text>
            <ScrollView
                onScroll={(event) => {
                    const scrollY = event.nativeEvent.contentOffset.y;
                    setScroll(scrollY);
                }}
                scrollEventThrottle={1}
            >
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
};

const SettingsScreen = () => (
    <View className="flex-1 justify-center items-center bg-white">
        <Text>Settings Screen</Text>
    </View>
);

const ProfileScreen = () => (
    <View className="flex-1 justify-center items-center bg-white">
        <Text>Profile Screen</Text>
    </View>
);

const TopTabs = () => {
    return (
        <SafeAreaView className="flex-1 bg-black">
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIndicatorStyle: { backgroundColor: '#3b82f6' },
                    tabBarStyle: { backgroundColor: 'black' },
                }}
            >
                <Tab.Screen name="Home" component={HomeProfile} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default TopTabs;
