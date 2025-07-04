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
import { NativewindColor } from "@/interfaces/natiwindColor";
import { ColorButton } from "@/interfaces/colorButton";

/* STORES */
import { useTempRoundsArray } from "@/stores/Rounds/roundStore";

export function PersonalizedRound({
  index,
  id,
  seconds,
  lastOne,
  color,
}: {
  index: number;
  id: string;
  seconds: number;
  lastOne: boolean;
  color: NativewindColor;
}) {
  const { tempRoundsArray, setTempRoundsArray } = useTempRoundsArray();

  const deleteRound = (idChange: string) => {
    const newArray = tempRoundsArray.filter((round) => round.id !== idChange);
    setTempRoundsArray(newArray);
  };

  const findTempRoundById = (c: ColorButton): string => {
    const currentRound = tempRoundsArray.find((round) => round.id === id);

    if (currentRound?.highColor === c.highColor) {
      return "scale-125";
    } else {
      return "scale-100";
    }
  };

  return (
    <View className={`${lastOne ? "mb-4" : ""}`}>
      <View
        className={`flex gap-4 p-4 mb-4 transition-all duration-150 rounded-xl ${color}`}
      >
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg text-white font-poppins">
            Tiempo {index + 1}
          </Text>
          <AnimatedButton
            backgroundColor="bg-red-100 p-2 rounded-full"
            componentClassName="self-center"
            icon={<Feather name="x" size={15} color={"#ef4444"} />}
            pressOutFunction={() => deleteRound(id)}
            wantIconAlone={true}
          />
        </View>
        <View className="flex flex-row items-center justify-between w-full h-fit">
          <AnimatedButton
            backgroundColor={`p-4 rounded-3xl ${seconds <= 5 ? "bg-neutral-300 pointer-events-none" : "bg-white"}`}
            componentClassName="self-center"
            icon={<AntDesign name="minus" size={24} color="#52525b" />}
            pressOutFunction={() =>
              setTempRoundsArray(
                tempRoundsArray.map((round) =>
                  round.id === id && round.seconds >= 6
                    ? {
                        id: round.id,
                        highColor: round.highColor,
                        lowColor: round.lowColor,
                        seconds: round.seconds - 1,
                      }
                    : round
                )
              )
            }
            wantIconAlone={true}
          />
          <Text className="text-lg text-white font-poppins">{seconds}</Text>
          <AnimatedButton
            backgroundColor={`bg-white p-4 rounded-3xl ${seconds >= 5940 ? "bg-neutral-300 pointer-events-none" : "bg-white"}`}
            componentClassName="self-center"
            icon={<AntDesign name="plus" size={24} color="#52525b" />}
            pressOutFunction={() =>
              setTempRoundsArray(
                tempRoundsArray.map((round) =>
                  round.id === id && round.seconds <= 20
                    ? {
                        id: round.id,
                        highColor: round.highColor,
                        lowColor: round.lowColor,
                        seconds: round.seconds + 1,
                      }
                    : round
                )
              )
            }
            wantIconAlone={true}
          />
        </View>
      </View>
      <View className="flex flex-row gap-3 m-auto">
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
      </View>
    </View>
  );
}
