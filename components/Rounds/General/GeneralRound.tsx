import { Pressable, Text } from "react-native";

export function GeneralRound({
  title,
  onPress,
  lastOne,
  prev,
}: {
  title: string;
  onPress: Function;
  lastOne: boolean;
  prev: React.ReactNode;
}) {
  return (
    <Pressable
      className={`flex justify-center p-4 max-w-60 gap-2 rounded-xl bg-white ${lastOne ? "" : "mr-4"}`}
      onPress={() => onPress()}
    >
      <Text className="text-lg text-neutral-600 font-poppins">{title}</Text>
      {prev}
    </Pressable>
  );
}
