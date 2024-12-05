import Constants from 'expo-constants';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Modal, TextInput, KeyboardAvoidingView, Text, SafeAreaView } from 'react-native';
import { Button } from '@/components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import Avatar from '@/components/Avatar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { PostPosts } from '@/lib/Api_calls/Api_calls';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type AddPostModalProps = {
    openModal: boolean;
    setopenModal: (open: boolean) => void;
};

const AddPostModal: FC<AddPostModalProps> = ({ openModal, setopenModal }) => {
    const [content, setContent] = useState('');
    const inputRef = useRef<TextInput>(null);

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => PostPosts({ content }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            setopenModal(false);
            setContent('');
        },
        onError: (error) => {
            console.error('Failed to post:', error);
        },
    });

    useEffect(() => {
        if (openModal && inputRef.current) {
            inputRef.current.focus();
        }
    }, [openModal]);

    return (
        <Modal visible={openModal} animationType="slide" onRequestClose={() => setopenModal(false)}>
            <KeyboardAvoidingView behavior="padding" className="flex-1">
                <SafeAreaView
                    style={{
                        flex: 1,
                        paddingTop: Constants.statusBarHeight,
                    }}
                    className="flex-1 bg-black relative"
                >
                    <View className="flex-row justify-between m-3">
                        <AntDesign
                            name="close"
                            size={24}
                            color="white"
                            onPress={() => setopenModal(false)}
                        />
                        <Button
                            text="Post"
                            onPress={() => mutate()}
                            loading={isPending}
                            fontStyling="text-white text-lg"
                            className="bg-blue-400 px-4 py-2 rounded-full w-auto"
                        />
                    </View>
                    <View className="flex-row mx-3">
                        <Avatar className="size-12 mr-2" src="https://i.pravatar.cc/100" />
                        <TextInput
                            ref={inputRef}
                            autoFocus
                            placeholder="What's happening?"
                            placeholderTextColor="#888"
                            className="text-white text-lg p-2 flex-1"
                            multiline
                            onChange={(e) => setContent(e.nativeEvent.text)}
                        />
                    </View>
                    <View
                        className="absolute bottom-0 w-full border-t border-b border-gray-500
                        flex-row py-3 items-center"
                    >
                        <FontAwesome name="globe" size={24} color="#60a5fa" className="mx-3" />
                        <Text className="text-blue-400">Every one can reply</Text>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default AddPostModal;
