import { create } from 'zustand';

interface HeaderStore {
    showHeader: boolean;
    setShowHeader: (showHeader: boolean) => void;
}

const useHeaderStore = create<HeaderStore>((set) => ({
    showHeader: true,
    setShowHeader: (showHeader: boolean) => set({ showHeader }),
}));

export default useHeaderStore;
