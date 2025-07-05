import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function NotFoundPage({ text }: { text: string }) {
  return (
    <SafeAreaView className="flex items-center justify-center flex-1 px-4">
      <Text className="text-xl font-poppins text-neutral-600">{text}</Text>
    </SafeAreaView>
  );
}
