import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { PostType } from '@/app/tabs';
import Avatar from '@/components/Avatar';

const Tweet = ({ post }: { post: PostType }) => {
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
                            <EvilIcons name="heart" size={24} color="#e5e7eb" />
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
