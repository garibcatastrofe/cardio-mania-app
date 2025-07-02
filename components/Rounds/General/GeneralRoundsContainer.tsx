import { View, FlatList, Text } from "react-native";

/* COMPONENTS */
import { GeneralRound } from "@/components/Rounds/General/GeneralRound";

/* DATA */
import { generalRounds } from "@/data/generalRounds";

export function GeneralRoundsContainer() {
  return (
    <View className="w-[calc(100%-2rem)]">
      <Text className="my-2 text-2xl font-poppins text-neutral-600">
        Genérico
      </Text>
      <FlatList
        data={generalRounds}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <GeneralRound
            title={item.name}
            onPress={() => console.log("General round presionado")}
            lastOne={index + 1 > generalRounds.length - 1}
            prev={item.prev}
          />
        )}
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}
