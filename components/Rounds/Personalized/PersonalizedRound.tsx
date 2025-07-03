import { View, Text, Pressable } from "react-native";

/* COMPONENTS */
import { AnimatedButton } from "@/components/Animated/AnimatedButton";

/* ICONS */
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

/* INTERFACES */
import { NativewindColor } from "@/interfaces/natiwindColor";

/* STORES */
import { useTempRoundsArray } from "@/stores/Rounds/roundStore";

export function PersonalizedRound({
  index,
  seconds,
  lastOne,
  color,
}: {
  index: number;
  seconds: number;
  lastOne: boolean;
  color: NativewindColor;
}) {
  const { tempRoundsArray, setTempRoundsArray } = useTempRoundsArray();

  return (
    <View className={`${lastOne ? "mb-4" : ""}`}>
      <View className={`flex gap-4 p-4 mb-4 rounded-xl ${color}`}>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg text-white font-poppins">
            Tiempo {index + 1}
          </Text>
          <AnimatedButton
            backgroundColor="bg-red-100 p-2 rounded-full"
            componentClassName="self-center"
            icon={<Feather name="x" size={15} color={"#ef4444"} />}
            pressOutFunction={() => console.log("Delete round button pressed!")}
            wantIconAlone={true}
          />
        </View>
        <View className="flex flex-row items-center justify-between w-full h-fit">
          <AnimatedButton
            backgroundColor="bg-white p-4 rounded-3xl"
            componentClassName="self-center"
            icon={<AntDesign name="minus" size={24} color="#52525b" />}
            pressOutFunction={() => console.log("Minus pressed!")}
            wantIconAlone={true}
          />
          <Text className="text-lg text-white font-poppins">{seconds}</Text>
          <AnimatedButton
            backgroundColor="bg-white p-4 rounded-3xl"
            componentClassName="self-center"
            icon={<AntDesign name="plus" size={24} color="#52525b" />}
            pressOutFunction={() => console.log("Plus pressed!")}
            wantIconAlone={true}
          />
        </View>
      </View>
      <View className="flex flex-row gap-2 m-auto">
        <Pressable
          onPress={() =>
            setTempRoundsArray(
              tempRoundsArray.map((round) =>
                round.id === index
                  ? {
                      id: round.id,
                      highColor: "bg-red-400",
                      lowColor: "bg-red-300",
                      seconds: round.seconds,
                    }
                  : round
              )
            )
          }
          className="self-center p-3 bg-red-400 rounded-full"
        ></Pressable>
        <Pressable
          onPress={() =>
            setTempRoundsArray(
              tempRoundsArray.map((round) =>
                round.id === index
                  ? {
                      id: round.id,
                      highColor: "bg-orange-400",
                      lowColor: "bg-orange-300",
                      seconds: round.seconds,
                    }
                  : round
              )
            )
          }
          className="self-center p-3 bg-orange-400 rounded-full"
        ></Pressable>
        <Pressable
          onPress={() =>
            setTempRoundsArray(
              tempRoundsArray.map((round) =>
                round.id === index
                  ? {
                      id: round.id,
                      highColor: "bg-yellow-400",
                      lowColor: "bg-yellow-300",
                      seconds: round.seconds,
                    }
                  : round
              )
            )
          }
          className="self-center p-3 bg-yellow-400 rounded-full"
        ></Pressable>
        <Pressable
          onPress={() =>
            setTempRoundsArray(
              tempRoundsArray.map((round) =>
                round.id === index
                  ? {
                      id: round.id,
                      highColor: "bg-green-400",
                      lowColor: "bg-green-300",
                      seconds: round.seconds,
                    }
                  : round
              )
            )
          }
          className="self-center p-4 bg-green-400 rounded-full"
        ></Pressable>
        <Pressable
          onPress={() =>
            setTempRoundsArray(
              tempRoundsArray.map((round) =>
                round.id === index
                  ? {
                      id: round.id,
                      highColor: "bg-cyan-400",
                      lowColor: "bg-cyan-300",
                      seconds: round.seconds,
                    }
                  : round
              )
            )
          }
          className="self-center p-3 rounded-full bg-cyan-400"
        ></Pressable>
        <Pressable
          onPress={() =>
            setTempRoundsArray(
              tempRoundsArray.map((round) =>
                round.id === index
                  ? {
                      id: round.id,
                      highColor: "bg-blue-400",
                      lowColor: "bg-blue-300",
                      seconds: round.seconds,
                    }
                  : round
              )
            )
          }
          className="self-center p-3 bg-blue-400 rounded-full"
        ></Pressable>
        <Pressable
          onPress={() =>
            setTempRoundsArray(
              tempRoundsArray.map((round) =>
                round.id === index
                  ? {
                      id: round.id,
                      highColor: "bg-purple-400",
                      lowColor: "bg-purple-300",
                      seconds: round.seconds,
                    }
                  : round
              )
            )
          }
          className="self-center p-3 bg-purple-400 rounded-full"
        ></Pressable>
      </View>
    </View>
  );
}
