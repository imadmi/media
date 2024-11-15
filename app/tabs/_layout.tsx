import React from 'react';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View } from 'react-native';
import { Image } from 'expo-image';
import Avatar from '@/components/Avatar';
import { StatusBar } from 'expo-status-bar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
    return (
        <>
            <StatusBar style="light" />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: 'white',
                    tabBarStyle: { backgroundColor: 'black' },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="home" size={24} color={color} />
                        ),
                        headerTitle: () => (
                            <View className="justify-center items-center h-12">
                                <Image
                                    source={require('../../assets/images/media-letter-logo-template-vector.svg')}
                                    style={{
                                        height: 120,
                                        width: 120,
                                        tintColor: 'white',
                                    }}
                                />
                            </View>
                        ),
                        headerStyle: { backgroundColor: 'black' },
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <View className="flex-row items-center justify-center pl-2">
                                <Avatar
                                    src="https://i.pravatar.cc/100"
                                    className="h-9 w-9"
                                    fallback="I"
                                />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Settings"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome6 name="circle-user" size={24} color={color} />
                        ),
                        headerShown: false,
                    }}
                />
            </Tabs>
        </>
    );
}
