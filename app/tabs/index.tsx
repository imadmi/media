import React, { useRef, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView } from 'react-native';
import useHeaderStore from '@/store/showHeaderStore';
import Tweet from '@/utils/Tweet';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/lib/Api_calls/Api_calls';
import { Header } from '@/utils/Header';
import { AddPost } from '@/utils/AddPost';

const App = () => {
    const showHeader = useHeaderStore((state) => state.showHeader);
    const setShowHeader = useHeaderStore((state) => state.setShowHeader);
    const lastScrollY = useRef(0);

    const handleScroll = (event: any) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const scrollMargin = 20;

        if (currentScrollY < lastScrollY.current - scrollMargin) {
            setShowHeader(true);
        } else if (currentScrollY > lastScrollY.current + scrollMargin) {
            setShowHeader(false);
        }

        lastScrollY.current = currentScrollY;
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    return (
        <SafeAreaView className="bg-black flex-1 relative">
            <Header />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Tweet post={item} />}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                bounces={!showHeader ? false : true}
                className="flex-1 "
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refetch}
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
