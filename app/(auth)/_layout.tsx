import { Stack } from 'expo-router';
import 'react-native-reanimated';
import '../../global.css';
import { hydrateAuth } from '@/lib/auth';


export default function RootLayout() {
    hydrateAuth();
    return (
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
    );
}
