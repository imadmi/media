import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from './client';

export const fetchPosts = async () => {
    const { data } = await client.get('/posts');
    return data;
};

type postType = {
    content: string;
};

export const PostPosts = async (content: postType) => {
    const { data } = await client.post('/posts', content);
    return data;
};

export const likePost = async (postId: number) => {
    const { data } = await client.post(`/like/${postId}`);
    return data;
};

export const dislikePost = async (postId: number) => {
    const { data } = await client.delete(`/like/${postId}`);
    return data;
};

export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error) => {
            console.error('Error liking the post:', error);
        },
    });
};

export const useDislikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: dislikePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error) => {
            console.error('Error liking the post:', error);
        },
    });
};

export const postComment = async (postId: number, content: string) => {
    const { data } = await client.post(`/comments`, { postId, content });
    return data;
};
