import { create } from "zustand";

interface TabBarState {
  height: number;
  setHeight: (value: number) => void;
}

export const useTabBarStore = create<TabBarState>((set) => ({
  height: 0,
  setHeight: (value) => set({ height: value }),
}));
