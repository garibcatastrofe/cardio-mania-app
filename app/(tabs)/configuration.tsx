import { StatusBar, InteractionManager } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";

/* COMPONENTS */
import { PersonalizedRoundsContainer } from "@/components/Rounds/Personalized/PersonalizedRoundsContainer";
import { GenericRoundsContainer } from "@/components/Rounds/Generic/GenericRoundsContainer";

/* STORES */
import { useTabBarStore } from "@/stores/TabBarHeight/tabBarHeightStore";

export default function Configuration() {
  const tabBarHeight = useTabBarStore((state) => state.height);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        StatusBar.setBarStyle("dark-content");
        StatusBar.setBackgroundColor("transparent");
      });

      return () => task.cancel(); // cancela si se sale de foco
    }, [])
  );

  return (
    <SafeAreaView
      className="flex-1 bg-neutral-100"
      style={{ paddingBottom: tabBarHeight }}
    >
      <GenericRoundsContainer />
      <PersonalizedRoundsContainer />
    </SafeAreaView>
  );
}
