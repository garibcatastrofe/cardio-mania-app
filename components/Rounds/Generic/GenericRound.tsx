import { Pressable, Text, View, Animated, Platform } from "react-native";
import { useRef } from "react";

/* FUNCTIONS */
import { getTwentyFirstLetters } from "@/utils/getTwentyFirstLetters";

/* ICONS */
import Entypo from "@expo/vector-icons/Entypo";

/* INTERFACES */
import { Round } from "@/interfaces/round";

export function GenericRound({
  title,
  onPress,
  lastOne,
  rounds,
  componentClassName,
}: {
  title: string;
  onPress: Function;
  lastOne: boolean;
  rounds: Round[];
  componentClassName: string;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const Component = Platform.OS === "web" ? View : Animated.View;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95, // Se reduce un 10%
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
    onPress();
  };

  return (
    <Component
      className={`${componentClassName} ${lastOne ? "" : "mr-4"}`}
      style={Platform.OS !== "web" && { transform: [{ scale: scaleAnim }] }}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        className={`flex justify-center p-4 max-w-96 self-start gap-2 overflow-hidden rounded-xl bg-white`}
      >
        <Text className="text-lg text-neutral-600 font-poppins">
          {getTwentyFirstLetters(title)}
        </Text>
        <View className="flex flex-row flex-wrap items-center">
          {rounds.map((round, index) => {
            if (index >= 3) return;
            return (
              <View key={index} className="flex flex-row items-center">
                <View
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${round.highColor}`}
                >
                  <Text className="text-lg text-white font-poppins">
                    {round.seconds}
                  </Text>
                </View>
                {index <= 1 && (
                  <Entypo name="dot-single" size={24} color="#e5e5e5" />
                )}
              </View>
            );
          })}
          <Entypo
            className="ml-2"
            name="dots-three-horizontal"
            size={24}
            color="#e5e5e5"
          />
        </View>
      </Pressable>
    </Component>
  );
}
