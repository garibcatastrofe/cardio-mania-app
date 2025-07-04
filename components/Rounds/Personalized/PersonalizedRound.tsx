import { View, Text, Pressable } from "react-native";

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
  id: number;
  seconds: number;
  lastOne: boolean;
  color: NativewindColor;
}) {
  const { tempRoundsArray, setTempRoundsArray } = useTempRoundsArray();

  const deleteRound = (idCambiar: number) => {
    const newArray = tempRoundsArray.filter((round) => round.id !== idCambiar);
    setTempRoundsArray(newArray);
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
                  round.id === index && round.seconds >= 6
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
                  round.id === index && round.seconds <= 20
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
            padding={
              c.highColor === tempRoundsArray[index].highColor
                ? "scale-125"
                : "scale-100"
            }
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
