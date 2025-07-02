import { StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";

/* COMPONENTS */
import { SpecificRoundsContainer } from "@/components/Rounds/Specific/SpecificRoundsContainer";
import { GeneralRoundsContainer } from "@/components/Rounds/General/GeneralRoundsContainer";

/* STORES */
import { useTabBarStore } from "@/stores/TabBarHeight/tabBarHeightStore";

export default function Configuration() {
  const tabBarHeight = useTabBarStore((state) => state.height);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      console.log(tabBarHeight);
    }, [])
  );

  return (
    <SafeAreaView
      className="items-center justify-center flex-1 px-4 bg-neutral-100"
      style={{ paddingBottom: tabBarHeight }}
    >
      <GeneralRoundsContainer />
      <SpecificRoundsContainer />
    </SafeAreaView>
  );
}
