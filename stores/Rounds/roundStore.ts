import { create } from "zustand";
import { Round } from "@/interfaces/round";

interface RoundArray {
  roundsArray: Round[];
  setRoundsArray: (roundsArray: Round[]) => void;
  addRound: (round: Omit<Round, "id">) => Promise<void>;
}

export const useRoundsArray = create<RoundArray>((set) => ({
  roundsArray: [],

  setRoundsArray: (roundsArray) => set({ roundsArray }),

  addRound: async (round) => {
    const { generateId } = await import("@/utils/generateId");
    const id = await generateId();

    set((state) => ({
      roundsArray: [...state.roundsArray, { ...round, id }],
    }));
  },
}));

interface TempRoundArray {
  tempRoundsArray: Round[];
  setTempRoundsArray: (tempRoundsArray: Round[]) => void;
  addRound: (round: Omit<Round, "id">) => Promise<void>;
}

export const useTempRoundsArray = create<TempRoundArray>((set) => ({
  tempRoundsArray: [],
  setTempRoundsArray: (tempRoundsArray) =>
    set({
      tempRoundsArray,
    }),

  addRound: async (round) => {
    const { generateId } = await import("@/utils/generateId");
    const id = await generateId();

    set((state) => ({
      tempRoundsArray: [...state.tempRoundsArray, { ...round, id }],
    }));
  },
}));
