import Constants from 'expo-constants';
import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Modal, TextInput, KeyboardAvoidingView, Text, SafeAreaView } from 'react-native';
import { Button } from '@/components/Button';
import AntDesign from '@expo/vector-icons/AntDesign';
import Avatar from '@/components/Avatar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { postComment, PostPosts } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUser } from '@/lib/user';
import Separator from '@/components/Separator';

type CommentModalProps = {
    openModal: boolean;
    setopenModal: (open: boolean) => void;
    login: string;
    postId: number;
};

const CommentModal: FC<CommentModalProps> = ({ openModal, setopenModal, login, postId }) => {
    const [content, setContent] = useState('');
    const inputRef = useRef<TextInput>(null);

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => postComment(postId, content),
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
                            text="Reply"
                            onPress={() => mutate()}
                            loading={isPending}
                            fontStyling="text-white text-lg"
                            className="bg-blue-400 px-4 py-2 rounded-full w-auto"
                        />
                    </View>
                    <View className="flex-row">
                        <Separator vertical className="mx-9 bg-gray-500 h-10" />
                        <Text className="text-gray-500 text-xl">Reply to</Text>
                        <Text className="text-blue-400 text-xl">{login}</Text>
                    </View>
                    <View className="flex-row mx-3">
                        <Avatar className="size-12 mr-2" src={getUser()?.picture} />
                        <TextInput
                            ref={inputRef}
                            autoFocus
                            placeholder="Post your reply"
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
                        <Text className="text-blue-400">Every one can see your comment</Text>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CommentModal;
