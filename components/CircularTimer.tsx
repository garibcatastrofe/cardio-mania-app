import { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  currentSeconds: number;
  totalSeconds: number;
  size?: number;
  color?: string;
  paused?: boolean;
  active?: boolean;
  keyFrame?: number;
  colorStroke?: string;
};

export default function CircularTimer({
  currentSeconds,
  totalSeconds,
  size = 250,
  color = "#525252",
  paused = false,
  active = true,
  keyFrame = 0,
  colorStroke = "#ffffff",
}: Props) {
  const radius = size / 2 - 15;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(1);

  useEffect(() => {
    if (!active) {
      cancelAnimation(progress);
      progress.value = 1;
      return;
    }

    // Al cambiar de segmento (nuevo keyFrame), reiniciar progreso
    if (!paused) {
      cancelAnimation(progress);
      progress.value = 1; // reiniciar al 100%
      progress.value = withTiming(0, {
        duration: totalSeconds * 1000,
      });
    } else {
      cancelAnimation(progress); // si está pausado, detenemos animación
    }
  }, [keyFrame]);

  useEffect(() => {
    if (!active || keyFrame === undefined) return;

    if (!paused) {
      cancelAnimation(progress);
      progress.value = withTiming(0, {
        duration: totalSeconds * 1000 * progress.value,
      });
    } else {
      cancelAnimation(progress);
    }
  }, [paused]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * progress.value,
  }));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View className="items-center justify-center my-6">
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorStroke}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="butt" // Borde recto ⬅️
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          fill="none"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text className="absolute text-4xl text-white font-poppins_bold">
        {formatTime(currentSeconds)}
      </Text>
    </View>
  );
}
