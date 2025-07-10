import { View, Text } from "react-native";

/* COMPONENTS */
import { AnimatedButton } from "@/components/Animated/AnimatedButton";
import { ChangeColorButton } from "./ChangeColorButton";

/* DATA */
import { colorButtons } from "@/data/colorButtons";

/* ICONS */
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

/* INTERFACES */
import { NativewindColor } from "@/interfaces/nativewindColor";
import { ColorButton } from "@/interfaces/colorButton";

/* STORES */
import { useTempRoundsArray } from "@/stores/Rounds/roundStore";
import { useEffect } from "react";
import { Round } from "@/interfaces/round";
import { getHexaColorByNativewindColor } from "@/utils/getHexaColorByNativewindColor";

export function PersonalizedRound({
  index,
  round,
}: {
  index: number;
  round: Round;
}) {
  const { tempRoundsArray, setTempRoundsArray } = useTempRoundsArray();

  const deleteRound = (idChange: string) => {
    const newArray = tempRoundsArray.filter((round) => round.id !== idChange);
    setTempRoundsArray(newArray);
  };

  const findTempRoundById = (c: ColorButton): string => {
    const currentRound = tempRoundsArray.find((r) => r.id === round.id);

    if (currentRound?.highColor === c.highColor) {
      return "scale-125";
    } else {
      return "scale-100";
    }
  };

  const getColor = (color: NativewindColor): string => {
    switch (color) {
      case "bg-red-400":
        return "bg-red-400";
      case "bg-orange-400":
        return "bg-orange-400";
      case "bg-amber-400":
        return "bg-amber-400";
      case "bg-green-400":
        return "bg-green-400";
      case "bg-cyan-400":
        return "bg-cyan-400";
      case "bg-blue-400":
        return "bg-blue-400";
      case "bg-purple-400":
        return "bg-purple-400";
    }
    return ""
  };

  return (
    <View className="mb-4">
      <View
        className={`flex gap-4 p-4 mb-4 transition-all duration-150 rounded-xl ${getColor(round.highColor)}`}
      >
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg text-white font-poppins">Tiempo {index + 1}</Text>
          <AnimatedButton
            backgroundColor="bg-red-100 p-2 rounded-full"
            componentClassName="self-center"
            icon={<Feather name="x" size={15} color={"#ef4444"} />}
            pressOutFunction={() => deleteRound(round.id)}
            wantIconAlone={true}
          />
        </View>
        <View className="flex flex-row items-center justify-between w-full h-fit">
          <AnimatedButton
            backgroundColor={`p-4 rounded-3xl ${round.seconds <= 5 ? "bg-neutral-200 pointer-events-none" : "bg-white"}`}
            componentClassName="self-center"
            icon={<AntDesign name="minus" size={24} color="#52525b" />}
            pressOutFunction={() =>
              setTempRoundsArray(
                tempRoundsArray.map((r) =>
                  r.id === round.id && r.seconds >= 6
                    ? {
                        id: r.id,
                        highColor: r.highColor,
                        lowColor: r.lowColor,
                        seconds: r.seconds - 1,
                      }
                    : r
                )
              )
            }
            wantIconAlone={true}
          />
          <Text className="text-lg text-white font-poppins">{round.seconds}</Text>
          <AnimatedButton
            backgroundColor={`bg-white p-4 rounded-3xl ${round.seconds >= 5940 ? "bg-neutral-200 pointer-events-none" : "bg-white"}`}
            componentClassName="self-center"
            icon={<AntDesign name="plus" size={24} color="#52525b" />}
            pressOutFunction={() =>
              setTempRoundsArray(
                tempRoundsArray.map((r) =>
                  r.id === round.id && r.seconds <= 20
                    ? {
                        id: r.id,
                        highColor: r.highColor,
                        lowColor: r.lowColor,
                        seconds: r.seconds + 1,
                      }
                    : r
                )
              )
            }
            wantIconAlone={true}
          />
        </View>
      </View>
      {/* <View className="flex flex-row gap-3 m-auto">
        {colorButtons.map((c, i) => (
          <ChangeColorButton
            key={i}
            padding={findTempRoundById(c)}
            color={c.highColor}
            onPress={() =>
              setTempRoundsArray(
                tempRoundsArray.map((round) =>
                  round.id === id
                    ? {
                        id: round.id,
                        highColor: c.highColor,
                        lowColor: c.lowColor,
                        seconds: round.seconds,
                      }
                    : round
                )
              )
            }
          />
        ))}
      </View> */}
    </View>
  );
}
