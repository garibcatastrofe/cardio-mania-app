import { View, Pressable, Animated, Platform, Text } from "react-native";
import { useRef } from "react";

export function AnimatedButton({
  pressOutFunction,
  backgroundColor,
  icon,
  icon1,
  text,
  wantIconAlone,
  componentClassName,
}: {
  pressOutFunction: Function;
  backgroundColor: string;
  icon?: React.ReactNode;
  icon1?: React.ReactNode;
  text?: string;
  wantIconAlone: boolean;
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
        className={`items-center justify-center rounded-3xl ${backgroundColor}`}
      >
        <Component
          style={Platform.OS !== "web" && { transform: [{ scale: scaleAnim }] }}
        >
          {wantIconAlone ? (
            <>
              {icon}
              {icon1}
            </>
          ) : (
            text !== "" &&
            text !== null &&
            text !== undefined && (
              <View className="flex flex-row items-center justify-center gap-2">
                {icon}
                <Text className="font-poppins text-neutral-600">{text}</Text>
              </View>
            )
          )}
        </Component>
      </Pressable>
    </Component>
  );
}
