import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import Avatar from '@/components/Avatar';
import { useDislikePost, useLikePost } from '@/lib/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getUser } from '@/lib/user';
import CommentModal from './commentModal';
import clsx from 'clsx';
import { router } from 'expo-router';

export type PostType = {
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
    comments: {
        id: number;
        authorId: number;
        createdAt: string;
        content: string;
        author: { fullName: string; login: string; picture: string };
    }[];
    reposts: { id: number; userId: number }[];
};

const Tweet = ({ post }: { post: PostType }) => {
    const [openModal, setOpenModal] = useState(false);
    const { mutate: likePost, isPending: isLiking } = useLikePost();
    const { mutate: dislikePost, isPending: isDisliking } = useDislikePost();

    const isUserLiked = useMemo(
        () => post.likes.some((like) => like.userId === getUser()?.id),
        [post.likes]
    );

    const isUserCommented = useMemo(
        () => post.comments.some((comment) => comment.authorId === getUser()?.id),
        [post.comments]
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
            <TouchableOpacity
                className="flex-row items-center"
                onPress={() =>
                    router.push({
                        pathname: '/Post',
                        params: { post: JSON.stringify({ ...post, isUserLiked, isUserCommented }) },
                    })
                }
            >
                <View className="w-12 h-12">
                    <Avatar src={post.author.picture} />
                </View>
                <View className="ml-4 flex-row gap-1 items-center">
                    <Text className="text-white font-semibold text-lg">{post.author.fullName}</Text>
                    <Text className="text-gray-200">@{post.author.login}</Text>
                    <Text className="text-gray-200">. {date}</Text>
                </View>
            </TouchableOpacity>
            <View className="flex-row">
                <View className="w-12 h-12 mr-4" />
                <View className="flex-1">
                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '/Post',
                                params: {
                                    post: JSON.stringify({ ...post, isUserLiked, isUserCommented }),
                                },
                            })
                        }
                    >
                        <Text className="mt-4 text-white">{post.content}</Text>
                    </TouchableOpacity>
                    <View className="mt-4 flex-row items-center justify-between">
                        <TouchableOpacity className="flex-row items-center">
                            <EvilIcons name="retweet" size={24} color="#e5e7eb" />
                            <Text className="ml-1 text-gray-200">{post.reposts.length}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={() => setOpenModal(true)}
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
                                <AntDesign name="heart" size={18} color="red" />
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
                setOpenModal={setOpenModal}
                login={'@' + post.author.login}
                postId={post.id}
            />
        </View>
    );
};

export default Tweet;
