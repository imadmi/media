import Constants from 'expo-constants';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Modal, TextInput, KeyboardAvoidingView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import Avatar from '@/components/Avatar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { client } from '@/lib/client';
import { set } from 'react-hook-form';

type AddPostModalProps = {
    openModal: boolean;
    setopenModal: (open: boolean) => void;
};

const AddPostModal: FC<AddPostModalProps> = ({ openModal, setopenModal }) => {
    const [content, setContent] = useState('');
    const [loading, setloading] = useState(false);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (openModal && inputRef.current) {
            inputRef.current.focus();
        }
    }, [openModal]);

    const handlePost = async () => {
        try {
            setloading(true);
            if (!content) {
                setloading(false);
                return;
            }
            const res = await client.post('/posts', {
                content: content,
            });
            setloading(false);
        } catch (error) {
            console.error('Failed to post:', error);
            setloading(false);
        }
    };
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
                            onPress={handlePost}
                            loading={loading}
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
