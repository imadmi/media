import * as React from 'react';
import { Image } from 'expo-image';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { router } from 'expo-router';
import SignupForm from './SignupForm';

const SignUp = () => {
    return (
        <SafeAreaView className="bg-black flex-1">
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                // keyboardVerticalOffset={10}
            >
                <View className="flex-1 justify-center items-center gap-6 p-6 bg-black">
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
                    <Text className="text-white text-xl font-semibold">Sign up to Media</Text>

                    <SignupForm />
                    <View className="w-full flex-row mt-10">
                        <Text className="text-white">Already have an account? </Text>
                        <TouchableOpacity
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <Text className="text-blue-500 font-semibold">Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default SignUp;
