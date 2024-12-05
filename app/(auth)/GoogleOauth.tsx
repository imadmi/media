import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { Image } from 'expo-image';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { router } from 'expo-router';
import { useAuth } from '@/lib/auth';
import { client } from '@/lib/client';
import axios from 'axios';
import { Text, View } from 'react-native';
import { setUser } from '@/lib/user';

WebBrowser.maybeCompleteAuthSession();

function GoogleOauth() {
    const config = {
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    };

    const [request, response, promptAsync] = Google.useAuthRequest(config);

    const [loading, setLoading] = useState(false);
    const [errorFromApi, setError] = useState<string | null>(null);
    const { signIn } = useAuth();

    const signInAPI = async (userInfo: any) => {
        try {
            setLoading(true);
            console.log('userInfo', userInfo);
            const response = await client.post('/auth/oauth2', {
                fullName: userInfo.name,
                email: userInfo.email,
                picture: userInfo.picture,
            });
            
            if (response.data.success) {
                signIn({
                    access: response.data.userWithAccessToken.token,
                    refresh: 'refresh-token',
                });
                setUser(response.data.userWithAccessToken);
                router.push('/tabs');
                return;
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

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
            signInAPI(userInfo);
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
        <>
            <Button
                loading={loading}
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
            <View>
                {errorFromApi && <Text className="text-red-500 text-sm mb-2">{errorFromApi}</Text>}
            </View>
        </>
    );
}

export default GoogleOauth;
