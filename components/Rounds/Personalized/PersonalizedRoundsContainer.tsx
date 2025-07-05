import { View, FlatList, Text } from "react-native";

/* COMPONENTS */
import { PersonalizedRound } from "@/components/Rounds/Personalized/PersonalizedRound";
import { AnimatedButton } from "@/components/Animated/AnimatedButton";

/* ICONS */
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

/* STORES */
import { useTempRoundsArray } from "@/stores/Rounds/roundStore";

export function PersonalizedRoundsContainer() {
  const { tempRoundsArray, addRound } = useTempRoundsArray();

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
          pressOutFunction={() =>
            addRound({
              highColor: "bg-red-400",
              lowColor: "bg-red-300",
              seconds: 10,
            })
          }
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
