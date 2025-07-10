/* INTERFACES */
import { Round } from "@/interfaces/round";

export const generalRounds: {
  id: number;
  name: string;
  rounds: Round[];
}[] = [
  {
    id: 0,
    name: "3 vueltas, 3 ejercicios",
    rounds: [
      {
        id: "1",
        highColor: "bg-cyan-400",
        lowColor: "bg-cyan-300",
        seconds: 10,
      },
      {
        id: "2",
        highColor: "bg-amber-400",
        lowColor: "bg-amber-300",
        seconds: 30,
      },
      {
        id: "3",
        highColor: "bg-green-400",
        lowColor: "bg-green-300",
        seconds: 20,
      },
    ],
  },
  {
    id: 1,
    name: "TABATA",
    rounds: [
      {
        id: "1",
        highColor: "bg-cyan-400",
        lowColor: "bg-cyan-300",
        seconds: 10,
      },
      {
        id: "2",
        highColor: "bg-red-400",
        lowColor: "bg-red-300",
        seconds: 20,
      },
      {
        id: "3",
        highColor: "bg-orange-400",
        lowColor: "bg-orange-300",
        seconds: 10,
      },
    ],
  },
];
