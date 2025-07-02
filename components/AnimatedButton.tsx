import { View, Pressable, Animated, Platform } from "react-native";
import { useRef } from "react";

export function AnimatedButton({
  pressOutFunction,
  backgroundColor,
  icon,
  icon1,
  componentClassName,
}: {
  pressOutFunction: Function;
  backgroundColor: string;
  icon: React.ReactNode;
  icon1?: React.ReactNode;
  componentClassName: string;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const Component = Platform.OS === "web" ? View : Animated.View;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.9, // Se reduce un 10%
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1, // Vuelve al tamaño normal
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    pressOutFunction();
  };

  return (
    <Component
      className={`${componentClassName}`}
      style={Platform.OS !== "web" && { transform: [{ scale: scaleAnim }] }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        className={`items-center justify-center p-4 rounded-3xl ${backgroundColor}`}
      >
        <Component
          style={Platform.OS !== "web" && { transform: [{ scale: scaleAnim }] }}
        >
          {icon}
          {icon1}
        </Component>
      </Pressable>
    </Component>
  );
}
