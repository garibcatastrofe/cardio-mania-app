import { View } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

/* ICONS */
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { buildHref } = useLinkBuilder();

  const icons = {
    index: (props: any) => <FontAwesome5 name="running" size={24} {...props} />,
    configuration: (props: any) => (
      <FontAwesome5 name="cog" size={24} {...props} />
    ),
  };
  return (
    <View className="absolute flex-row items-center justify-between mx-6 bg-white rounded-full bottom-6">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

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

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.name}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            pressColor="#00000000"
            className="items-center justify-center flex-1 py-6"
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
