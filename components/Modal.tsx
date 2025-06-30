import { View, Text, Pressable, ScrollView } from "react-native";
import { useModal } from "../stores/Modal/modalStore";
import AntDesign from "@expo/vector-icons/AntDesign";

export function Modal() {
  const { isActivated, setModal, modalTitle, modalBody } = useModal();

  const hacerModalFalso = () => {
    console.log("Haciendo modal falso...")
    setModal(false, modalTitle ?? "", modalBody);
  };

  return (
    <View className={`absolute inset-0 z-10 items-center justify-center px-4 bg-black/50 ${ isActivated ? "opacity-100" : "opacity-0 pointer-events-none" }`}>
      <View className="w-full p-4 bg-white h-2/3 rounded-2xl">
        <View className="flex flex-row items-center justify-between mb-2">
          <Text className="text-xl font-poppins">{modalTitle}</Text>
          <Pressable onPress={hacerModalFalso}>
            <AntDesign name="close" size={24} color="black" />
          </Pressable>
        </View>
        <ScrollView className="bg-neutral-400">
          {modalBody}
        </ScrollView>
      </View>
    </View>
  );
}
