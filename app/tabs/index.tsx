import React, { useRef, useState } from 'react';
import { View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import useHeaderStore from '@/store/showHeaderStore';
import Tweet from '@/utils/Tweet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Avatar from '@/components/Avatar';
import { MotiView } from 'moti';
import AddPostModal from '@/utils/AddPostModal';

export const posts = [
    {
        id: 1,
        content: 'Excited to start my new journey in software engineering!',
        media: null,
        author: {
            id: 1,
            email: 'john.doe@example.com',
            fullName: 'John Doe',
            login: 'johnny',
            picture: 'https://i.pravatar.cc',
        },
        likes: [
            { id: 1, userId: 2, createdAt: '2024-11-18T10:00:00Z' },
            { id: 2, userId: 3, createdAt: '2024-11-18T11:00:00Z' },
        ],
        comments: [
            {
                id: 1,
                content: 'Congratulations!',
                author: { id: 2, fullName: 'Jane Smith', login: 'jane' },
                createdAt: '2024-11-18T10:30:00Z',
            },
        ],
        reposts: [{ id: 1, userId: 3, createdAt: '2024-11-18T11:30:00Z' }],
        createdAt: '2024-11-18T09:00:00Z',
        updatedAt: '2024-11-18T09:00:00Z',
    },
    {
        id: 2,
        content: "Here's a photo from my trip to the mountains!",
        media: null,
        author: {
            id: 2,
            email: 'jane.smith@example.com',
            fullName: 'Jane Smith',
            login: 'jane',
            picture: 'https://i.pravatar.cc',
        },
        likes: [{ id: 3, userId: 1, createdAt: '2024-11-18T12:00:00Z' }],
        comments: [],
        reposts: [],
        createdAt: '2024-11-18T10:00:00Z',
        updatedAt: '2024-11-18T10:00:00Z',
    },
    {
        id: 3,
        content: "Look at this cute puppy I found! Isn't it adorable?",
        media: null,
        author: {
            id: 2,
            email: 'jane.smith@example.com',
            fullName: 'Imad Ait Ouhmane',
            login: 'imad',
            picture: 'https://i.pravatar.cc',
        },
        likes: [{ id: 3, userId: 1, createdAt: '2024-11-18T12:00:00Z' }],
        comments: [],
        reposts: [],
        createdAt: '2024-11-18T10:00:00Z',
        updatedAt: '2024-11-18T10:00:00Z',
    },
    {
        id: 4,
        content:
            'This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!This is a photo of my cat. His name is Fluffy!',
        media: null,
        author: {
            id: 2,
            email: 'jane.smith@example.com',
            fullName: 'Imad Ait Ouhmane',
            login: 'imad',
            picture: 'https://i.pravatar.cc',
        },
        likes: [{ id: 3, userId: 1, createdAt: '2024-11-18T12:00:00Z' }],
        comments: [],
        reposts: [],
        createdAt: '2024-11-18T10:00:00Z',
        updatedAt: '2024-11-18T10:00:00Z',
    },
    {
        id: 5,
        content: "Here's a photo from my trip to the mountains!",
        media: null,
        author: {
            id: 2,
            email: 'jane.smith@example.com',
            fullName: 'Imad Ait Ouhmane',
            login: 'imad',
            picture: 'https://i.pravatar.cc',
        },
        likes: [{ id: 3, userId: 1, createdAt: '2024-11-18T12:00:00Z' }],
        comments: [],
        reposts: [],
        createdAt: '2024-11-18T10:00:00Z',
        updatedAt: '2024-11-18T10:00:00Z',
    },
    {
        id: 6,
        content: "Here's a photo from my trip to the mountains!",
        media: null,
        author: {
            id: 2,
            email: 'jane.smith@example.com',
            fullName: 'Imad Ait Ouhmane',
            login: 'imad',
            picture: 'https://i.pravatar.cc',
        },
        likes: [{ id: 3, userId: 1, createdAt: '2024-11-18T12:00:00Z' }],
        comments: [],
        reposts: [],
        createdAt: '2024-11-18T10:00:00Z',
        updatedAt: '2024-11-18T10:00:00Z',
    },
    {
        id: 7,
        content: "Here's a photo from my trip to the mountains!",
        media: null,
        author: {
            id: 2,
            email: 'jane.smith@example.com',
            fullName: 'Imad Ait Ouhmane',
            login: 'imad',
            picture: 'https://i.pravatar.cc',
        },
        likes: [{ id: 3, userId: 1, createdAt: '2024-11-18T12:00:00Z' }],
        comments: [],
        reposts: [],
        createdAt: '2024-11-18T10:00:00Z',
        updatedAt: '2024-11-18T10:00:00Z',
    },
];

export type PostType = (typeof posts)[0];

const AddPost = () => {
    const showHeader = useHeaderStore((state) => state.showHeader);
    const [openModal, setopenModal] = useState(false);
    return (
        <>
            <TouchableOpacity onPress={() => setopenModal(true)}>
                <MotiView
                    style={{
                        overflow: 'hidden',
                    }}
                    from={{
                        height: showHeader ? 0 : 60,
                        width: showHeader ? 0 : 60,
                        opacity: showHeader ? 0 : 1,
                    }}
                    animate={{
                        height: showHeader ? 60 : 0,
                        width: showHeader ? 60 : 0,
                        opacity: showHeader ? 1 : 0,
                    }}
                    transition={{
                        type: 'timing',
                        duration: 300,
                    }}
                    className="absolute bg-blue-400 rounded-full bottom-4 right-4
            items-center justify-center z-10"
                >
                    <AntDesign name="plus" size={24} color="white" />
                </MotiView>
            </TouchableOpacity>
            {openModal && <AddPostModal openModal={openModal} setopenModal={setopenModal} />}
        </>
    );
};

const Header = () => {
    const showHeader = useHeaderStore((state) => state.showHeader);

    return (
        <MotiView
            style={{
                overflow: 'hidden',
            }}
            from={{
                height: showHeader ? 0 : 60,
                opacity: showHeader ? 0 : 1,
            }}
            animate={{
                height: showHeader ? 60 : 0,
                opacity: showHeader ? 1 : 0,
            }}
            transition={{
                type: 'timing',
                duration: 300,
            }}
            className="bg-black border-b border-gray-700 flex-row items-center justify-between px-4"
        >
            <View className="flex-row items-center justify-center pl-2">
                <Avatar src="https://i.pravatar.cc/100" className="h-8 w-8" fallback="I" />
            </View>
            <View className="justify-center items-center h-12">
                <Image
                    source={require('../../assets/images/media-letter-logo-template-vector.svg')}
                    style={{
                        height: 120,
                        width: 180,
                        tintColor: 'white',
                    }}
                />
            </View>
            <View className="size-8" />
        </MotiView>
    );
};

const App = () => {
    const showHeader = useHeaderStore((state) => state.showHeader);
    const setShowHeader = useHeaderStore((state) => state.setShowHeader);
    const lastScrollY = useRef(0);
    const [refreshing, setRefreshing] = useState(false);

    const handleScroll = (event: any) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const scrollMargin = 20;

        if (currentScrollY < lastScrollY.current - scrollMargin / 2) {
            setShowHeader(true);
        } else if (currentScrollY > lastScrollY.current + scrollMargin) {
            setShowHeader(false);
        }

        lastScrollY.current = currentScrollY;
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setRefreshing(false);
    };

    return (
        <SafeAreaView className="bg-black flex-1 relative">
            <Header />
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Tweet post={item} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                bounces={!showHeader ? false : true}
                className="flex-1"
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor="white"
                        colors={['white']}
                    />
                }
            />
            <AddPost />
        </SafeAreaView>
    );
};

export default App;
