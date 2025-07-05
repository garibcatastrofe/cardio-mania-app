/* INTERFACES */
import { NativewindColor } from "@/interfaces/nativewindColor";

export interface Round {
  id: string;
  seconds: number;
  highColor: NativewindColor;
  lowColor: NativewindColor;
}
