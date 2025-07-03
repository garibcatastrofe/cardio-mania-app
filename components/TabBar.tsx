import { View } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";

/* ICONS */
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

/* STORES */
import { useTabBarStore } from "@/stores/TabBarHeight/tabBarHeightStore";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();
  const { setHeight } = useTabBarStore();

  const icons = {
    index: (props: any) => <FontAwesome5 name="running" size={24} {...props} />,
    configuration: (props: any) => (
      <FontAwesome5 name="cog" size={24} {...props} />
    ),
  };
  return (
    <View
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        const totalHeight = height + 48; // 24px de `bottom-6`
        setHeight(totalHeight);
      }}
      className="absolute flex-row items-center justify-between w-[calc(100%-3rem)] mx-6 bottom-6"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const [isPressed, setIsPressed] = useState(false);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <PlatformPressable
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            pressColor="#00000000"
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isPressed ? "#f3f4f6" : "white",
              paddingVertical: 24,
              borderTopLeftRadius: route.name === "index" ? 48 : 0,
              borderBottomLeftRadius: route.name === "index" ? 48 : 0,
              borderTopEndRadius: route.name === "configuration" ? 48 : 0,
              borderBottomEndRadius: route.name === "configuration" ? 48 : 0,
            }}
          >
            {icons[
              route.name === "index" || route.name === "configuration"
                ? route.name
                : "index"
            ]({ color: isFocused ? "#525252" : "#d4d4d4" })}
          </PlatformPressable>
        );
      })}
    </View>
  );
}
