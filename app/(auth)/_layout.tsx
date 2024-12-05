import React from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../../global.css';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {

    return (
        <>
            <StatusBar style="light" backgroundColor="black" />
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </>
    );
}
