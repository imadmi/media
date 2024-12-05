import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Avatar from '@/components/Avatar';
import { useDislikePost, useLikePost } from '@/lib/Api_calls/Api_calls';
import AntDesign from '@expo/vector-icons/AntDesign';

type PostType = {
    id: number;
    content: string;
    media?: string | null;
    createdAt: string;
    author: {
        picture: string;
        fullName: string;
        login: string;
    };
    likes: { id: number; userId: number }[];
    comments: { id: number; userId: number }[];
    reposts: { id: number; userId: number }[];
};

const Tweet = ({ post }: { post: PostType }) => {
    const { mutate: likePOst, isPending: isloading } = useLikePost();
    const { mutate: dislikePOst, isPending } = useDislikePost();

    const isUserLiked = useMemo(() => {
        // if (post.likes.find((like) => like.userId === user.Id)) {
        if (post.likes.find((like) => like.userId === 1)) {
            return true;
        }
        return false;
    }, [post.likes]);

    const handleLike = () => {
        if (isloading || isPending) {
            return;
        }
        // if (post.likes.find((like) => like.userId === user.Id)) {
        if (post.likes.find((like) => like.userId === 1)) {
            dislikePOst(post.id);
            return;
        }
        likePOst(post.id);
    };

    return (
        <View className={'p-4 mb-4 rounded-lg border-b border-gray-700'}>
            <View className={'flex-row items-center'}>
                <View className="w-12 h-12">
                    <Avatar src={post.author.picture} />
                </View>
                <View className={'ml-4'}>
                    <Text className={'text-white font-semibold text-lg'}>
                        {post.author.fullName}
                    </Text>
                    <Text className={'text-gray-100'}>@{post.author.login}</Text>
                </View>
            </View>
            <View className="flex-row">
                <View className="w-12 h-12 mr-4" />
                <View className="flex-1">
                    <View className="w-full pr-1 overflow-hidden">
                        <Text className={'mt-4 text-white '}>{post.content}</Text>
                    </View>
                    <View className={'mt-4 flex-row items-center text-white justify-between'}>
                        <TouchableOpacity className="flex-row items-center">
                            {isUserLiked ? (
                                <AntDesign
                                    name="heart"
                                    size={19}
                                    color="#e5e7eb"
                                    className="pr-1"
                                    onPress={handleLike}
                                />
                            ) : (
                                <EvilIcons
                                    name="heart"
                                    size={24}
                                    color="#e5e7eb"
                                    onPress={handleLike}
                                />
                            )}
                            <Text className={'ml-1 text-gray-200'}>{post.likes.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <EvilIcons name="comment" size={24} color="#e5e7eb" />
                            <Text className={'ml-1 text-gray-200'}>{post.comments.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <EvilIcons name="retweet" size={24} color="#e5e7eb" />
                            <Text className={'ml-1 text-gray-200'}>{post.reposts.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <EvilIcons name="share-google" size={24} color="#e5e7eb" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
export default Tweet;
