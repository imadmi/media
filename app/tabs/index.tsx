import { getItem } from '@/lib/storage';
import React from 'react';

function index() {
    return <div>{JSON.stringify(getItem('user'))}</div>;
}

export default index;
