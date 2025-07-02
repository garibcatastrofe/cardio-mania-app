/* INTERFACES */
import { Round } from "@/interfaces/round";
import { Text, View } from "react-native";

export const generalRounds: {
  id: number;
  name: string;
  prev: React.ReactNode;
  rounds: Round[];
}[] = [
  {
    id: 0,
    name: "Genérico 1",
    prev: (
      <View className="flex gap-2">
        <View className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-400">
          <Text className="text-white font-poppins">10</Text>
        </View>
        <View className="flex flex-row gap-2">
          {[0, 1, 2].map((_, i) => (
            <View className="flex flex-row gap-2" key={i}>
              <View className="flex items-center justify-center w-10 h-10 bg-yellow-400 rounded-full">
                <Text className="text-white font-poppins">30</Text>
              </View>
              <View className="flex items-center justify-center w-10 h-10 bg-green-400 rounded-full">
                <Text className="text-white font-poppins">20</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    ),
    rounds: [],
  },
  {
    id: 1,
    name: "Genérico 2",
    prev: <Text>Hola</Text>,
    rounds: [],
  },
  {
    id: 2,
    name: "Genérico 3",
    prev: <Text>Hola</Text>,
    rounds: [],
  },
  {
    id: 3,
    name: "Genérico 4",
    prev: <Text>Hola</Text>,
    rounds: [],
  },
  {
    id: 4,
    name: "Genérico 5",
    prev: <Text>Hola</Text>,
    rounds: [],
  },
  {
    id: 5,
    name: "Genérico 6",
    prev: <Text>Hola</Text>,
    rounds: [],
  },
  {
    id: 6,
    name: "Genérico 7",
    prev: <Text>Hola</Text>,
    rounds: [],
  },
];
