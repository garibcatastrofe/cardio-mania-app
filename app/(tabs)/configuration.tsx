import { StatusBar } from "react-native";
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
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#f5f5f5");
    }, [])
  );

  return (
    <SafeAreaView
      className="items-center justify-center flex-1 px-4 bg-neutral-100"
      style={{ paddingBottom: tabBarHeight }}
    >
      {/* <GenericRoundsContainer />
      <PersonalizedRoundsContainer /> */}
    </SafeAreaView>
  );
}
