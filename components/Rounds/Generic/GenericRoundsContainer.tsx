import { View, FlatList, Text } from "react-native";

/* COMPONENTS */
import { GenericRound } from "@/components/Rounds/Generic/GenericRound";

/* DATA */
import { generalRounds } from "@/data/generalRounds";

export function GenericRoundsContainer() {
  return (
    <View className="w-[calc(100%-2rem)]">
      <Text className="mt-6 mb-2 text-2xl font-poppins text-neutral-600">
        Genérico
      </Text>
      <FlatList
        data={generalRounds}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <GenericRound
            title={item.name}
            onPress={() => console.log("General round presionado")}
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
