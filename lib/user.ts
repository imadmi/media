import { getItem, removeItem, setItem } from './storage';

const USER = 'user';

type UserType = {
    id: number;
    fullName: string;
    login: string;
    picture: string;
};

export const getUser = () => getItem<UserType>(USER);
export const removeUser = () => removeItem(USER);
export const setUser = (value: UserType) => setItem<UserType>(USER, value);
