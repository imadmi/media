import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Avatar from '@/components/Avatar';
import { useDislikePost, useLikePost } from '@/lib/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getUser, removeUser } from '@/lib/user';
import { removeToken } from '@/lib/auth';
import CommentModal from './commentModal';
import clsx from 'clsx';

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
    comments: { id: number; authorId: number }[];
    reposts: { id: number; userId: number }[];
};

const Tweet = ({ post }: { post: PostType }) => {
    const [openModal, setopenModal] = useState(false);
    const { mutate: likePost, isPending: isLiking } = useLikePost();
    const { mutate: dislikePost, isPending: isDisliking } = useDislikePost();

    const isUserLiked = useMemo(
        () => post.likes.some((like) => like.userId === getUser()?.id),
        [post.likes]
    );

    const isUserCommented = useMemo(
        () => post.comments.some((comment) => comment.authorId === getUser()?.id),
        [post.likes]
    );

    const handleLike = () => {
        if (isLiking || isDisliking) return;
        likePost(post.id);
    };

    const handleDislike = () => {
        if (isLiking || isDisliking) return;
        dislikePost(post.id);
    };

    const date = new Date(post.createdAt).toDateString();

    return (
        <View className="p-4 mb-4 rounded-lg border-b border-gray-700">
            <View className="flex-row items-center">
                <View className="w-12 h-12">
                    <Avatar src={post.author.picture} />
                </View>
                <View className="ml-4 flex-row gap-1 items-center">
                    <Text className="text-white font-semibold text-lg">{post.author.fullName}</Text>
                    <Text className="text-gray-200">@{post.author.login}</Text>
                    <Text className="text-gray-200">. {date}</Text>
                </View>
            </View>
            <View className="flex-row">
                <View className="w-12 h-12 mr-4" />
                <View className="flex-1">
                    <Text className="mt-4 text-white">{post.content}</Text>
                    <View className="mt-4 flex-row items-center justify-between">
                        <TouchableOpacity className="flex-row items-center">
                            <EvilIcons name="retweet" size={24} color="#e5e7eb" />
                            <Text className="ml-1 text-gray-200">{post.reposts.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => setopenModal(true)}
                        >
                            <EvilIcons
                                name="comment"
                                size={24}
                                color={isUserCommented ? '#4ade80' : '#e5e7eb'}
                            />
                            <Text
                                className={clsx('ml-1', {
                                    'text-gray-200': !isUserCommented,
                                    'text-green-400 font-semibold': isUserCommented,
                                })}
                            >
                                {post.comments.length}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={!isUserLiked ? handleLike : handleDislike}
                        >
                            {isUserLiked ? (
                                <AntDesign name="heart" size={18} color="red" className="mr-1" />
                            ) : (
                                <EvilIcons name="heart" size={24} color="#e5e7eb" />
                            )}

                            <Text
                                className={clsx('ml-1', {
                                    'text-red-500 font-semibold': isUserLiked,
                                    'text-gray-200': !isUserLiked,
                                })}
                            >
                                {post.likes.length}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-row items-center">
                            <EvilIcons name="share-google" size={24} color="#e5e7eb" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <CommentModal
                openModal={openModal}
                setopenModal={setopenModal}
                login={'@' + post.author.login}
                postId={post.id}
            />
        </View>
    );
};

export default Tweet;
