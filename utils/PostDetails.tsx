import Avatar from '@/components/Avatar';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PostType } from './Tweet';
import { AntDesign, EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useDislikePost, useLikePost } from '@/lib/api';
import clsx from 'clsx';
import { formatTimeDifference } from './formatTimeDifference';
import { ScrollView } from 'moti';
import React, { useState } from 'react';
type propsType = PostType & {
    isUserLiked: boolean;
    isUserCommented: boolean;
};

export const PostDetails = ({ post }: { post: propsType }) => {
    const { mutate: likePost, isPending: isLiking } = useLikePost();
    const { mutate: dislikePost, isPending: isDisliking } = useDislikePost();

    const handleLike = () => {
        if (isLiking || isDisliking) return;
        likePost(post.id);
        post.isUserLiked = true;
        post.likes.length += 1
    };

    const handleDislike = () => {
        if (isLiking || isDisliking) return;
        dislikePost(post.id);
        post.isUserLiked = false;
        post.likes.length -= 1
    };
    const date = new Date(post.createdAt).toDateString();

    return (
        <ScrollView className="p-4 mb-4 rounded-lg border-y border-gray-800">
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
            <View className="flex-row mb-1">
                <View className="w-12 h-12 mr-4" />
                <View className="flex-1">
                    <View>
                        <Text className="mt-4 text-white ">{post.content}</Text>
                    </View>
                </View>
            </View>

            <View className="py-4 border-y border-gray-800">
                <View className="flex-row items-center justify-between px-4">
                    <View className="flex-row items-center">
                        <Text className="ml-1 text-gray-200 font-bold text-lg">
                            {post.reposts.length}
                        </Text>
                        <Text className="ml-1 text-gray-200">
                            {post.reposts.length > 1 ? 'Reposts' : 'Repost'}
                        </Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="ml-1 text-gray-200 font-bold text-lg">
                            {post.comments.length}
                        </Text>

                        <Text className="ml-1 text-gray-200">
                            {post.comments.length > 1 ? 'Comments' : 'Comment'}
                        </Text>
                    </View>

                    <View
                        className="flex-row items-center"
                    >
                        <Text className="ml-1 text-gray-200 font-bold text-lg">
                            {post.likes.length}
                        </Text>
                        <Text className="ml-1 text-gray-200 font-bold">
                            {post.likes.length > 1 ? 'Likes' : 'Like'}
                        </Text>
                    </View>
                </View>
            </View>
            <View className="mt-4 flex-row items-center justify-between px-4 pb-4 border-b border-gray-800">
                <TouchableOpacity className="flex-row items-center">
                    <EvilIcons name="retweet" size={24} color="#e5e7eb" />
                    <Text className="ml-1 text-gray-200">{post.reposts.length}</Text>
                </TouchableOpacity>
                <View className="flex-row items-center">
                    <EvilIcons
                        name="comment"
                        size={24}
                        color={post.isUserCommented ? '#4ade80' : '#e5e7eb'}
                    />
                    <Text
                        className={clsx('ml-1', {
                            'text-gray-200': !post.isUserCommented,
                            'text-green-400 font-semibold': post.isUserCommented,
                        })}
                    >
                        {post.comments.length}
                    </Text>
                </View>

                <TouchableOpacity
                    className="flex-row items-center"
                    onPress={!post.isUserLiked ? handleLike : handleDislike}
                >
                    {post.isUserLiked ? (
                        <AntDesign name="heart" size={18} color="red" className="mr-1" />
                    ) : (
                        <EvilIcons name="heart" size={24} color="#e5e7eb" />
                    )}

                    <Text
                        className={clsx('ml-1', {
                            'text-red-500 font-semibold': post.isUserLiked,
                            'text-gray-200': !post.isUserLiked,
                        })}
                    >
                        {post.likes.length}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                    <EvilIcons name="share-google" size={24} color="#e5e7eb" />
                </TouchableOpacity>
            </View>
            <View className="mt-2 mb-10">
                {post.comments.map((item) => (
                    <Comment comment={item} key={item.id} />
                ))}
            </View>
        </ScrollView>
    );
};

const Comment = ({ comment }: { comment: PostType['comments'][0] }) => {
    const date = formatTimeDifference(comment.createdAt);

    return (
        <View className="py-3 border-b border-gray-800">
            <View className="flex-row items-center">
                <View className="w-10 h-10">
                    <Avatar src={comment.author.picture} />
                </View>
                <View className="ml-4 flex-row gap-1 items-center">
                    <Text className="text-white font-semibold text-lg">
                        {comment.author.fullName}
                    </Text>
                    <Text className="text-gray-200">@{comment.author.login}</Text>
                    <Text className="text-gray-200">. {date}</Text>
                </View>
            </View>
            <View className="flex-row mb-1">
                <View className="w-10 h-10 mr-4" />
                <View className="flex-1">
                    <View>
                        <Text className="mt-4 text-white ">{comment.content}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export const CommentInput = () => {
    const [content, setContent] = useState('');

    return (
        <View
            className="absolute bottom-0 w-full border-t border-b border-gray-800
            flex-row py-2 items-center bg-black"
        >
            <TextInput
                placeholder="Post your reply"
                placeholderTextColor="#888"
                className="text-white text-lg px-2 py-1 flex-1 max-h-20"
                multiline
                onChange={(e) => setContent(e.nativeEvent.text)}
            />
            <Ionicons name="send" size={24} color="#60a5fa" className="mx-3" />
        </View>
    );
};
