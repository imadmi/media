import React from 'react';
import { Button } from '@/components/Button';
import { Image } from 'expo-image';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { getItem, setItem } from '@/lib/storage';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

function GoogleOauth() {
    const [userInfo, setUserInfo] = React.useState(null);

    const config = {
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    };

    const [request, response, promptAsync] = Google.useAuthRequest(config);

    const getUserInfo = async (token: string) => {
        if (!token) return;
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = await response.json();
            const userInfo = {
                name: user.name,
                email: user.email,
                picture: user.picture,
            };
            setItem('user', JSON.stringify(userInfo));
            router.push('/tabs');
            // setUserInfo(user);
        } catch (error) {
            console.error('Failed to fetch user data');
        }
    };

    const signInWithGoogle = async () => {
        try {
            if (response?.type === 'success') {
                if (response?.authentication?.accessToken)
                    getUserInfo(response.authentication.accessToken);
            }
        } catch (error) {
            console.error('Error retrieving user data');
        }
    };

    React.useEffect(() => {
        signInWithGoogle();
    }, [response]);

    return (
        <Button
            // loading={true}
            text="Sign in with Google"
            onPress={() => {
                promptAsync();
            }}
            className="bg-white text-white w-full flex-row justify-center
            items-center h-12 rounded-[9999px]"
            fontStyling="text-md font-normal"
            startIcon={
                <Image
                    source={require('../../assets/images/google-icon-logo.svg')}
                    style={{
                        height: 24,
                        width: 24,
                    }}
                />
            }
        />
    );
}

export default GoogleOauth;
