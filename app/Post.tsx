import { View, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { CommentInput, PostDetails } from '@/utils/PostDetails';
import { ScrollView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Post = () => {
    const { post } = useLocalSearchParams() as { post: string };
    const postObject = JSON.parse(post);
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView className="bg-black flex-1">
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={insets.bottom + insets.top + 10}
            >
                {/* <ScrollView className='relative flex-1'> */}

                <View className="flex-1 bg-black relative">
                    <PostDetails post={postObject} />
                    <CommentInput />
                </View>
            {/* </ScrollView> */}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Post;
