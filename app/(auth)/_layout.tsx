import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../../global.css';
import { hydrateAuth } from '@/lib/auth';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    useEffect(() => {
        hydrateAuth();
    });
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
