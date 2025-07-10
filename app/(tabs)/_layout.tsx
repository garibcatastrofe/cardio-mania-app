import React from "react";
import { Tabs } from "expo-router";
import { TabBar } from "@/components/TabBar";

export default function TabLayout() {
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
