import React from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { AntDesign } from '@expo/vector-icons';
import useHeaderStore from '@/store/showHeaderStore';

export default function TabLayout() {
    const showHeader = useHeaderStore((state) => state.showHeader);

    return (
        <>
            <StatusBar style="light" />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: 'black',
                        display: showHeader ? 'flex' : 'none',
                    },
                    headerShown: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="home" size={24} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="Profile"
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
