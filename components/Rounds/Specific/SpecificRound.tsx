import { View, Text, Pressable } from "react-native";

/* ICONS */
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

/* COMPONENTS */
import { AnimatedButton } from "@/components/Animated/AnimatedButton";

export function SpecificRound({
  round,
  seconds,
  lastOne,
}: {
  round: number;
  seconds: number;
  lastOne: boolean;
}) {
  return (
    <View className={`${lastOne ? "mb-4" : ""}`}>
      <View className="flex gap-4 p-4 mb-4 bg-green-400 rounded-xl">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg text-white font-poppins">Ronda {round}</Text>
          <Pressable
            className="flex items-center justify-center p-2 bg-red-100 rounded-full"
            onPress={() => console.log("Delete round button pressed!")}
          >
            <Feather name="x" size={15} color={"#ef4444"} />
          </Pressable>
        </View>
        <View className="flex flex-row items-center justify-between w-full h-fit">
          <AnimatedButton
            backgroundColor="bg-white"
            componentClassName="self-center"
            icon={<AntDesign name="minus" size={24} color="#52525b" />}
            pressOutFunction={() => console.log("Minus pressed!")}
          />
          <Text className="text-lg text-white font-poppins">{seconds}</Text>
          <AnimatedButton
            backgroundColor="bg-white"
            componentClassName="self-center"
            icon={<AntDesign name="plus" size={24} color="#52525b" />}
            pressOutFunction={() => console.log("Plus pressed!")}
          />
        </View>
      </View>
      <View className="flex flex-row gap-2 m-auto">
        <Pressable className="self-center p-3 bg-red-400 rounded-full"></Pressable>
        <Pressable className="self-center p-3 bg-orange-400 rounded-full"></Pressable>
        <Pressable className="self-center p-3 bg-yellow-400 rounded-full"></Pressable>
        <Pressable className="self-center p-4 bg-green-400 rounded-full"></Pressable>
        <Pressable className="self-center p-3 rounded-full bg-cyan-400"></Pressable>
        <Pressable className="self-center p-3 bg-blue-400 rounded-full"></Pressable>
        <Pressable className="self-center p-3 bg-purple-400 rounded-full"></Pressable>
      </View>
    </View>
  );
}
