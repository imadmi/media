import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import useHeaderStore from '@/store/showHeaderStore';
import { MotiView } from 'moti';
import AddPostModal from '@/utils/AddPostModal';

export const AddPost = () => {
    const showHeader = useHeaderStore((state) => state.showHeader);
    const [openModal, setopenModal] = useState(false);
    return (
        <>
            <TouchableOpacity
                onPress={() => setopenModal(true)}
                className="absolute bottom-4 right-4"
            >
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
                    className="bg-blue-400 rounded-full
                    items-center justify-center z-10"
                >
                    <AntDesign name="plus" size={24} color="white" />
                </MotiView>
            </TouchableOpacity>
            <AddPostModal openModal={openModal} setopenModal={setopenModal} />
        </>
    );
};