import { StatusBar } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

/* COMPONENTS */
import { IndexPage } from "@/pages/IndexPage/IndexPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";

/* STORES */
import { useRoundsArray } from "@/stores/Rounds/roundStore";

export default function Index() {
  const { roundsArray } = useRoundsArray();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#f5f5f5");
    }, [])
  );

  return roundsArray === null ||
    roundsArray === undefined ||
    roundsArray.length === 0 ? (
    <NotFoundPage text="Cargando..." />
  ) : (
    <IndexPage />
  );
}
