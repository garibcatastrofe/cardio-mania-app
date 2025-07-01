import { create } from "zustand";
import { ReactNode } from "react";

// Tipado del estado global
interface RoundArray {
  roundsArray: number[];
  setRoundsArray: (number: number[]) => void;
}

// Crear el store
export const useRoundsArray = create<RoundArray>((set) => ({
  roundsArray: [
    10, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20, 30, 20,
  ],
  setRoundsArray: (roundsArray) =>
    set({
      roundsArray,
    }),
}));
