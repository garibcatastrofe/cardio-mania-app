import { StatusBar, InteractionManager } from "react-native";
import { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

/* COMPONENTS */
import { IndexPage } from "@/pages/IndexPage/IndexPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";

/* STORES */
import { useRoundsArray, useTempRoundsArray } from "@/stores/Rounds/roundStore";
import { initialRounds } from "@/data/initialRounds";
import { generateId } from "@/utils/generateId";

export default function Index() {
  const { roundsArray, setRoundsArray } = useRoundsArray();
  const { setTempRoundsArray } = useTempRoundsArray();

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        StatusBar.setBarStyle("light-content");
        StatusBar.setBackgroundColor("transparent");
      });

      return () => task.cancel(); // cancela si se sale de foco
    }, [])
  );

  useEffect(() => {
    const initRounds = async () => {
      const rounds = await Promise.all(
        initialRounds.map(async (round) => {
          console.log(round.highColor);
          return {
            id: await generateId(),
            seconds: round.seconds,
            highColor: round.highColor,
            lowColor: round.lowColor,
          };
        })
      );
      //console.log(rounds)
      setRoundsArray(rounds);
    };

    initRounds();
  }, []);

  useEffect(() => {
    console.log(roundsArray)
    setTempRoundsArray(roundsArray);
  }, [roundsArray]);

  return roundsArray === null ||
    roundsArray === undefined ||
    roundsArray.length === 0 ? (
    <NotFoundPage text="Cargando..." />
  ) : (
    <IndexPage />
  );
}
