import { View, FlatList, Text } from "react-native";

/* COMPONENTS */
import { GenericRound } from "@/components/Rounds/Generic/GenericRound";

/* DATA */
import { generalRounds } from "@/data/generalRounds";

export function GenericRoundsContainer() {
  const handlePressGenericRound = () => {
    console.log("Generic round pressed!!...");
  };

  const EmptyMessage = () => {
    return (
      <View>
        <Text className="font-poppins text-neutral-600">
          ¡No se encontraron tiempos genéricos!
        </Text>
      </View>
    );
  };
  return (
    <View className="w-[calc(100%-2rem)]">
      <Text className="mt-6 mb-2 text-2xl font-poppins text-neutral-600">
        Genérico
      </Text>
      <FlatList
        data={generalRounds}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={<EmptyMessage />}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <GenericRound
            title={item.name}
            onPress={handlePressGenericRound}
            lastOne={index + 1 > generalRounds.length - 1}
            rounds={item.rounds}
            componentClassName=""
          />
        )}
        style={{ borderRadius: 12, flexGrow: 0 }}
      />
    </View>
  );
}
