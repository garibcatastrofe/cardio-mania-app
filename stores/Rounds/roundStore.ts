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
