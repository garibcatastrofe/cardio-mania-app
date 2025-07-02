import { create } from "zustand";

// Tipado del estado global
interface RoundArray {
  roundsArray: Round[];
  setRoundsArray: (roundsArray: Round[]) => void;
}

interface Round {
  seconds: number;
  highColor: NativewindColor;
  lowColor: NativewindColor;
}

type NativewindColor =
  | "bg-red-400"
  | "bg-orange-400"
  | "bg-yellow-400"
  | "bg-green-400"
  | "bg-cyan-400"
  | "bg-blue-400"
  | "bg-purple-400"
  | "bg-red-300"
  | "bg-orange-300"
  | "bg-yellow-300"
  | "bg-green-300"
  | "bg-cyan-300"
  | "bg-blue-300"
  | "bg-purple-300";

// Crear el store
export const useRoundsArray = create<RoundArray>((set) => ({
  roundsArray: [
    {
      highColor: "bg-red-400",
      seconds: 10,
      lowColor: "bg-red-300",
    },
    {
      highColor: "bg-orange-400",
      seconds: 10,
      lowColor: "bg-orange-300",
    },
    {
      highColor: "bg-yellow-400",
      seconds: 10,
      lowColor: "bg-yellow-300",
    },
    {
      highColor: "bg-green-400",
      seconds: 10,
      lowColor: "bg-green-300",
    },
    {
      highColor: "bg-cyan-400",
      seconds: 10,
      lowColor: "bg-cyan-300",
    },
    {
      highColor: "bg-blue-400",
      seconds: 10,
      lowColor: "bg-blue-300",
    },
    {
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
