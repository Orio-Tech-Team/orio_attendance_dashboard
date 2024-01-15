import { create } from "zustand";

interface useTokenProps {
    token: string | null;
    onCreate: (str: string) => void;
    onDelete: () => void;
}

export const useToken = create<useTokenProps>((set) => ({
    token: null,
    onCreate: (str: string) => set({ token: str }),
    onDelete: () => set({ token: null }),
}));