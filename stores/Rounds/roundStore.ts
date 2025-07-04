import { create } from "zustand";
import { nanoid } from "nanoid";

/* INTERFACES */
import { Round } from "@/interfaces/round";

// Tipado del estado global
interface RoundArray {
  roundsArray: Round[];
  setRoundsArray: (roundsArray: Round[]) => void;
  addRound: (round: Omit<Round, "id">) => void;
}

// Crear el store
export const useRoundsArray = create<RoundArray>((set) => ({
  roundsArray: [
    {
      id: nanoid(),
      highColor: "bg-red-400",
      seconds: 10,
      lowColor: "bg-red-300",
    },
    {
      id: nanoid(),
      highColor: "bg-orange-400",
      seconds: 10,
      lowColor: "bg-orange-300",
    },
    {
      id: nanoid(),
      highColor: "bg-yellow-400",
      seconds: 10,
      lowColor: "bg-yellow-300",
    },
    {
      id: nanoid(),
      highColor: "bg-green-400",
      seconds: 10,
      lowColor: "bg-green-300",
    },
    {
      id: nanoid(),
      highColor: "bg-cyan-400",
      seconds: 10,
      lowColor: "bg-cyan-300",
    },
    {
      id: nanoid(),
      highColor: "bg-blue-400",
      seconds: 10,
      lowColor: "bg-blue-300",
    },
    {
      id: nanoid(),
      highColor: "bg-purple-400",
      seconds: 10,
      lowColor: "bg-purple-300",
    },
  ],
  setRoundsArray: (roundsArray) =>
    set({
      roundsArray,
    }),

  addRound: (round) =>
    set((state) => ({
      roundsArray: [...state.roundsArray, { ...round, id: nanoid() }],
    })),
}));

interface TempRoundArray {
  tempRoundsArray: Round[];
  setTempRoundsArray: (tempRoundsArray: Round[]) => void;
  addRound: (round: Omit<Round, "id">) => void;
}

export const useTempRoundsArray = create<TempRoundArray>((set) => ({
  tempRoundsArray: [],
  setTempRoundsArray: (tempRoundsArray) =>
    set({
      tempRoundsArray,
    }),

  addRound: (round) =>
    set((state) => ({
      tempRoundsArray: [...state.tempRoundsArray, { ...round, id: nanoid() }],
    })),
}));
