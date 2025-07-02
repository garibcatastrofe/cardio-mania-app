import { View, FlatList, Text, Pressable } from "react-native";
import { useEffect } from "react";

/* COMPONENTS */
import { SpecificRound } from "@/components/Rounds/Specific/SpecificRound";

/* STORES */
import { useRoundsArray } from "@/stores/Rounds/roundStore";

export function SpecificRoundsContainer() {
  const { setRoundsArray, roundsArray } = useRoundsArray();

  useEffect(() => {
    setRoundsArray(roundsArray);
  }, []);

  return (
    <View className="flex-1 w-full px-4">
      <Text className="mt-4 mb-2 text-2xl font-poppins text-neutral-600">Personalizado</Text>
      <FlatList
        data={roundsArray}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <SpecificRound
            round={index + 1}
            seconds={item.seconds}
            lastOne={index + 1 <= roundsArray.length - 1}
          />
        )}
        style={{
          gap: 10,
          display: "flex",
          borderRadius: 12,
        }}
      />
      <View className="flex flex-row gap-4 pt-4">
        <Pressable className="flex items-center justify-center flex-1 px-2 py-4 bg-white rounded-xl">
          <Text className="text-neutral-600 font-poppins">Cancelar</Text>
        </Pressable>
        <Pressable className="flex items-center justify-center flex-1 px-2 py-4 bg-white rounded-xl">
          <Text className="text-neutral-600 font-poppins">Agregar</Text>
        </Pressable>
        <Pressable className="flex items-center justify-center flex-1 px-2 py-4 bg-white rounded-xl">
          <Text className="text-neutral-600 font-poppins">Generar</Text>
        </Pressable>
      </View>
    </View>
  );
}
