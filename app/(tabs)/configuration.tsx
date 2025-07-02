import { Text, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";

export default function Configuration() {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      /* return () => {
        // (opcional) restaurar estilo anterior si quieres
        StatusBar.setBarStyle("light-content");
      }; */
    }, [])
  );
  
  return (
    <SafeAreaView className="items-center justify-center flex-1 px-4 bg-neutral-100">
      <Text className="text-3xl font-poppins">
        Aquí va a ir la pestaña para configurar los ciclos
      </Text>
    </SafeAreaView>
  );
}
