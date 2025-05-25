import Icon from "@expo/vector-icons/MaterialIcons";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function HomeDrawerLayout() {
  return (
    <GestureHandlerRootView>
      <Drawer>
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: "PokeApp",
            drawerIcon: (props) => <Icon name="home" {...props} />,
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: "Configuración",
            drawerIcon: (props) => <Icon name="settings" {...props} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
