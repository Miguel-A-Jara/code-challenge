import Icon from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

export default function HomeDrawerTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Pokemones",
          tabBarIcon: (props) => <Icon name="home" {...props} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoritos",
          tabBarIcon: (props) => <Icon name="favorite" {...props} />,
        }}
      />
    </Tabs>
  );
}
