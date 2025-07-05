import { Round } from "@/interfaces/round";

export const initialRounds: Omit<Round, "id">[] = [
  {
    highColor: "bg-red-400",
    lowColor: "bg-red-300",
    seconds: 10,
  },
  {
    highColor: "bg-orange-400",
    lowColor: "bg-orange-300",
    seconds: 10,
  },
  {
    highColor: "bg-yellow-400",
    lowColor: "bg-yellow-300",
    seconds: 10,
  },
  {
    highColor: "bg-green-400",
    lowColor: "bg-green-300",
    seconds: 10,
  },
  {
    highColor: "bg-cyan-400",
    lowColor: "bg-cyan-300",
    seconds: 10,
  },
  {
    highColor: "bg-blue-400",
    lowColor: "bg-blue-300",
    seconds: 10,
  },
  {
    highColor: "bg-purple-400",
    lowColor: "bg-purple-300",
    seconds: 10,
  },
];
