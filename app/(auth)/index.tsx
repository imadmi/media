import * as React from 'react';
import { Button } from '@/components/Button';
import Separator from '@/components/Separator';
import { Image } from 'expo-image';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import SignInForm from './SignInForm';
import { Redirect, router } from 'expo-router';
import GoogleOauth from './GoogleOauth';

export default function SignIn() {
    // return <Redirect href={'/tabs/'} />; // remove this line
    return (
        <SafeAreaView className="bg-black flex-1">
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                // keyboardVerticalOffset={10}
            >
                <View className="flex-1 justify-center items-center gap-5 p-6 bg-black">
                    <View className="justify-center items-center h-12">
                        <Image
                            source={require('../../assets/images/media-letter-logo-template-vector.svg')}
                            style={{
                                height: 160,
                                width: 160,
                                tintColor: 'white',
                            }}
                        />
                    </View>
                    <Text className="text-white text-xl font-semibold">Sign in to Media</Text>
                    <GoogleOauth />
                    <View className="h-12 w-full max-w-full justify-between items-center flex-row">
                        <Separator thickness={1} className="flex-1 bg-gray-600" />
                        <Text className="text-white mx-2">Or</Text>
                        <Separator thickness={1} className="flex-1 bg-gray-600" />
                    </View>
                    <SignInForm />
                    <Button
                        text="Forgot password?"
                        onPress={() => alert('Button Pressed!')}
                        className="border border-white w-full flex-row justify-center
                    items-center h-12 rounded-[9999px]"
                        fontStyling="text-lg font-semibold text-white "
                    />
                    <View className="w-full flex-row mt-10">
                        <Text className="text-white">Dont have an account? </Text>
                        <TouchableOpacity
                            onPress={() => {
                                router.push('/SignUp');
                            }}
                        >
                            <Text className="text-blue-500 font-semibold">Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
