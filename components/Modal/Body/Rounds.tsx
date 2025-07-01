import { View, FlatList, Text, Pressable } from "react-native";
import { useEffect } from "react";

/* COMPONENTS */
import { RoundIncreaseDecrease } from "@/components/RoundIncreaseDecrease";

/* STORES */
import { useRoundsArray } from "@/stores/Rounds/roundStore";

export function Rounds() {
  const { setRoundsArray, roundsArray } = useRoundsArray();

  useEffect(() => {
    setRoundsArray(roundsArray);
  }, []);

  return (
    <View className="h-full">
      <FlatList
        data={roundsArray}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <RoundIncreaseDecrease
            round={index + 1}
            seconds={item}
            lastOne={index + 1 <= roundsArray.length - 1}
          />
        )}
        style={{
          gap: 10,
          display: "flex",
          borderEndEndRadius: 12,
          borderEndStartRadius: 12,
        }}
      />
      <View className="flex flex-row gap-4 pt-4">
        <Pressable className="flex items-center justify-center flex-1 px-2 py-4 bg-neutral-100 rounded-xl">
          <Text className="text-neutral-600 font-poppins">Cancelar</Text>
        </Pressable>
        <Pressable className="flex items-center justify-center flex-1 px-2 py-4 bg-neutral-100 rounded-xl">
          <Text className="text-neutral-600 font-poppins">Agregar</Text>
        </Pressable>
        <Pressable className="flex items-center justify-center flex-1 px-2 py-4 bg-neutral-100 rounded-xl">
          <Text className="text-neutral-600 font-poppins">Generar</Text>
        </Pressable>
      </View>
    </View>
  );
}
