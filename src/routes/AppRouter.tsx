import { createDrawerNavigator } from "@react-navigation/drawer";
import { Welcome } from "../screens/welcome/Welcome";
import { Home } from "../screens/home/Home";
import { View } from "react-native";
import CustomDrawer from "./DrawerContent";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Analyze } from "../screens/analyze/Analyze";
const Drawer = createDrawerNavigator();


export const AppRouter = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "",
          drawerIcon: ({ color }) => (
            <Fontisto name="home" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Analise"
        component={Analyze}
        options={{
          headerTitle: "",
          drawerIcon: ({ color }) => (
            <Ionicons name="analytics" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
