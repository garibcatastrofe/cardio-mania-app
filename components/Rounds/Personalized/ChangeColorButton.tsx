/* COMPONENTS */
import { AnimatedButton } from "@/components/Animated/AnimatedButton";

/* INTERFACES */
import { NativewindColor } from "@/interfaces/natiwindColor";

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
    <AnimatedButton
      backgroundColor={
        color.toString() + " w-6 h-6 transition-all duration-150 " + padding
      }
      componentClassName={`rounded-full self-center`}
      pressOutFunction={handlePress}
      wantIconAlone={true}
    />
  );
}
