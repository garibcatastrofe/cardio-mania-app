import React from "react";
import { Tabs } from "expo-router";
import { TabBar } from "@/components/TabBar";
import { useEffect } from "react";

/* DATA */
import { initialRounds } from "@/data/initialRounds";

/* STORES */
import { useRoundsArray, useTempRoundsArray } from "@/stores/Rounds/roundStore";

/* UTILS */
import { generateId } from "@/utils/generateId";

export default function TabLayout() {
  const { roundsArray } = useRoundsArray();
  const { setTempRoundsArray } = useTempRoundsArray();

  useEffect(() => {
    const initRounds = async () => {
      const rounds = await Promise.all(
        initialRounds.map(async (round) => ({
          id: await generateId(),
          seconds: 10,
          highColor: round.highColor,
          lowColor: round.lowColor,
        }))
      );

      useRoundsArray.getState().setRoundsArray(rounds);
    };

    initRounds();
  }, []);

  useEffect(() => {
    setTempRoundsArray(roundsArray);
  }, [roundsArray]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="configuration"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
