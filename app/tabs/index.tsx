import { getItem } from '@/lib/storage';
import React from 'react';
import { Text } from 'react-native';

function index() {
    return <Text>{JSON.stringify(getItem('user'))}</Text>;
}

export default index;
