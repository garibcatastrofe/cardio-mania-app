import { create } from "zustand";

/* INTERFACES */
import { Round } from "@/interfaces/round";

// Tipado del estado global
interface RoundArray {
  roundsArray: Round[];
  setRoundsArray: (roundsArray: Round[]) => void;
}

// Crear el store
export const useRoundsArray = create<RoundArray>((set) => ({
  roundsArray: [
    {
      id: 0,
      highColor: "bg-red-400",
      seconds: 10,
      lowColor: "bg-red-300",
    },
    {
      id: 1,
      highColor: "bg-orange-400",
      seconds: 10,
      lowColor: "bg-orange-300",
    },
    {
      id: 2,
      highColor: "bg-yellow-400",
      seconds: 10,
      lowColor: "bg-yellow-300",
    },
    {
      id: 3,
      highColor: "bg-green-400",
      seconds: 10,
      lowColor: "bg-green-300",
    },
    {
      id: 4,
      highColor: "bg-cyan-400",
      seconds: 10,
      lowColor: "bg-cyan-300",
    },
    {
      id: 5,
      highColor: "bg-blue-400",
      seconds: 10,
      lowColor: "bg-blue-300",
    },
    {
      id: 6,
      highColor: "bg-purple-400",
      seconds: 10,
      lowColor: "bg-purple-300",
    },
  ],
  setRoundsArray: (roundsArray) =>
    set({
      roundsArray,
    }),
}));

interface TempRoundArray {
  tempRoundsArray: Round[];
  setTempRoundsArray: (tempRoundsArray: Round[]) => void;
}

export const useTempRoundsArray = create<TempRoundArray>((set) => ({
  tempRoundsArray: [],
  setTempRoundsArray: (tempRoundsArray) =>
    set({
      tempRoundsArray,
    }),
}));
