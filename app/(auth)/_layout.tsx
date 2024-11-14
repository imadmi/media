import React from 'react';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../../global.css';
import { hydrateAuth } from '@/lib/auth';
import { StatusBar } from 'expo-status-bar';

hydrateAuth();

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
