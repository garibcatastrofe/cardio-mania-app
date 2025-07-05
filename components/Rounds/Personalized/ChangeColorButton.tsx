import { Pressable } from "react-native";

/* INTERFACES */
import { NativewindColor } from "@/interfaces/nativewindColor";

export function ChangeColorButton({
  onPress,
  padding,
  color,
}: {
  onPress: Function;
  padding: string;
  color: NativewindColor;
}) {
  const handlePress = () => {
    onPress();
  };
  return (
    <Pressable
      onPress={handlePress}
      className={`${color.toString()} rounded-full self-center w-6 h-6 transition-all duration-150 ${padding}`}
    />
  );
}
