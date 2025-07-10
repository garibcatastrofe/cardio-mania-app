import { Text, View } from "react-native";

export function NotFoundPage({ text }: { text: string }) {
  return (
    <View className="flex items-center justify-center flex-1 px-4 bg-neutral-100">
      <Text className="text-xl font-poppins text-neutral-600">{text}</Text>
    </View>
  );
}
