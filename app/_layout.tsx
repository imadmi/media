import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { APIProvider } from '@/lib/api-provider';
import { getToken, hydrateAuth } from '@/lib/auth';
import { TouchableOpacity } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        hydrateAuth();
    }, []);

    useEffect(() => {
        if (getToken()?.access && loaded) {
            router.push('/tabs');
        }
    }, [loaded]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <APIProvider>
                <Stack>
                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                    <Stack.Screen name="tabs" options={{ headerShown: false }} />
                    <Stack.Screen
                        name="Post"
                        options={{
                            headerShown: true,
                            headerStyle: { backgroundColor: 'black' },
                            headerTitleStyle: { color: 'white' },
                            headerTintColor: 'white',
                            headerBackTitle: 'Back',
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Ionicons name="arrow-back" size={24} color="white" />
                                </TouchableOpacity>
                            ),
                        }}
                    />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </APIProvider>
        </ThemeProvider>
    );
}
