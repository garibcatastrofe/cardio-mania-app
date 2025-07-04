import { View, FlatList, Text } from "react-native";
import { useEffect } from "react";

/* COMPONENTS */
import { PersonalizedRound } from "@/components/Rounds/Personalized/PersonalizedRound";
import { AnimatedButton } from "@/components/Animated/AnimatedButton";

/* ICONS */
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

/* STORES */
import { useRoundsArray, useTempRoundsArray } from "@/stores/Rounds/roundStore";

export function PersonalizedRoundsContainer() {
  const { roundsArray, setRoundsArray } = useRoundsArray();
  const { tempRoundsArray, setTempRoundsArray } = useTempRoundsArray();

  useEffect(() => {
    setRoundsArray(roundsArray);
  }, []);

  useEffect(() => {
    setTempRoundsArray(roundsArray);
    console.log(
      "-------------------------------------------------------------------------"
    );
    console.log(tempRoundsArray);
  }, [roundsArray]);

  return (
    <View className="flex-1 w-[calc(100%-2rem)]">
      <Text className="mt-6 mb-2 text-2xl font-poppins text-neutral-600">
        Personalizado
      </Text>
      <FlatList
        data={tempRoundsArray}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <PersonalizedRound
            index={index}
            id={item.id}
            seconds={item.seconds}
            lastOne={index + 1 <= tempRoundsArray.length - 1}
            color={item.highColor}
          />
        )}
        style={{
          borderRadius: 12,
        }}
      />
      <View className="flex flex-row gap-4 mt-6">
        <AnimatedButton
          backgroundColor="bg-white w-full py-4 px-2"
          componentClassName="flex items-center justify-center flex-grow"
          pressOutFunction={() => console.log("Botón agregar presionado!...")}
          wantIconAlone={false}
          icon={<Ionicons name="add-outline" size={24} color="#525252" />}
          text="Agregar"
        />
        <AnimatedButton
          backgroundColor="bg-white w-full py-4 px-2"
          componentClassName="flex items-center justify-center flex-grow"
          pressOutFunction={() => console.log("Botón generar presionado!...")}
          wantIconAlone={false}
          icon={<Feather name="check" size={24} color="#525252" />}
          text="Generar"
        />
      </View>
    </View>
  );
}
