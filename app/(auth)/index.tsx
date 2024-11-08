import { Button } from '@/components/Button';
import CustomTextInput from '@/components/Input';
import Separator from '@/components/Separator';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

export default function SignIn() {
    return (
        <SafeAreaView className="bg-black flex-1">
            <StatusBar style="light" backgroundColor="black" />
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
                <Button
                    text="Sign in with Google"
                    onPress={() => alert('Button Pressed!')}
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
                <View className="h-12 w-full max-w-full justify-between items-center flex-row">
                    <Separator thickness={1} className="flex-1 bg-gray-600" />
                    <Text className="text-white mx-2">Or</Text>
                    <Separator thickness={1} className="flex-1 bg-gray-600" />
                </View>
                <Form />
                <Button
                    text="Sign in"
                    onPress={() => alert('Button Pressed!')}
                    className="bg-white text-white w-full flex-row justify-center
                    items-center h-12 rounded-[9999px]"
                    fontStyling="text-lg font-semibold "
                />
                <Button
                    text="Forgot password?"
                    onPress={() => alert('Button Pressed!')}
                    className="border border-white w-full flex-row justify-center
                    items-center h-12 rounded-[9999px]"
                    fontStyling="text-lg font-semibold text-white "
                />
                <View className="w-full flex-row mt-10">
                    <Text className="text-white">Dont have an account? </Text>
                    <TouchableOpacity>
                        <Text className="text-blue-500 font-semibold">Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const Form = () => {
    const [email, setemail] = React.useState('');
    return (
        <View className="w-full">
            <CustomTextInput
                // label="email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setemail}
                inputStyles="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200
                text-white"
                containerStyles="mb-4 text-white"
                labelStyles="text-lg font-semibold"
                // errorMessage="email is required"
                errorStyles="text-sm"
            />
            <CustomTextInput
                // label="email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setemail}
                inputStyles="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200
                text-white"
                containerStyles="mb-4 text-white"
                labelStyles="text-lg font-semibold"
                // errorMessage="email is required"
                errorStyles="text-sm"
            />
        </View>
    );
};
