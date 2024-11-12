import { create, StoreApi, UseBoundStore } from 'zustand';
import { getItem, removeItem, setItem } from './storage';

const TOKEN = 'token';

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
    const store = _store as WithSelectors<typeof _store>;
    store.use = {};
    for (const key of Object.keys(store.getState())) {
        (store.use as any)[key] = () => store((state) => state[key as keyof typeof state]);
    }
    return store;
};

export type TokenType = {
    access: string;
    refresh: string;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

interface AuthState {
    token: TokenType | null;
    status: 'idle' | 'signOut' | 'signIn';
    signIn: (data: TokenType) => void;
    signOut: () => void;
    hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
    status: 'idle',
    token: null,
    signIn: (token) => {
        setToken(token);
        set({ status: 'signIn', token });
    },
    signOut: () => {
        removeToken();
        set({ status: 'signOut', token: null });
    },
    hydrate: () => {
        try {
            const userToken = getToken();
            console.log("Hydrating token:", userToken);
            if (userToken) {
                get().signIn(userToken);
            } else {
                get().signOut();
            }
        } catch (error) {
            console.error("Failed to hydrate token:", error);
        }
    },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();