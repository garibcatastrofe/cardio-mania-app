/* INTERFACES */
import { NativewindColor } from "@/interfaces/nativewindColor";

export const getHexaColorByNativewindColor = (
  color: NativewindColor
): string => {
  var colorHexa = "";

  switch (color) {
    case "bg-red-400":
      colorHexa = "#f87171";
      break;
    case "bg-orange-400":
      colorHexa = "#fb923c";
      break;
    case "bg-amber-400":
      colorHexa = "#fbbf24";
      break;
    case "bg-green-400":
      colorHexa = "#4ade80";
      break;
    case "bg-cyan-400":
      colorHexa = "#22d3ee";
      break;
    case "bg-blue-400":
      colorHexa = "#60a5fa";
      break;
    case "bg-purple-400":
      colorHexa = "#c084fc";
      break;
    case "bg-red-300":
      colorHexa = "#fca5a5";
      break;
    case "bg-orange-300":
      colorHexa = "#fdba74";
      break;
    case "bg-amber-300":
      colorHexa = "#fcd34d";
      break;
    case "bg-green-300":
      colorHexa = "#86efac";
      break;
    case "bg-cyan-300":
      colorHexa = "#67e8f9";
      break;
    case "bg-blue-300":
      colorHexa = "#93c5fd";
      break;
    case "bg-purple-300":
      colorHexa = "#d8b4fe";
      break;
  }

  return colorHexa;
};
