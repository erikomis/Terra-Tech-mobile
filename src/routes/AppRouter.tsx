import { createDrawerNavigator } from "@react-navigation/drawer";
import { Home } from "../screens/home/Home";
import CustomDrawer from "./DrawerContent";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { Analyze } from "../screens/analyze/Analyze";
import { AppDrawerParamList } from "./types";

const Drawer = createDrawerNavigator<AppDrawerParamList>();

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
          drawerIcon: () => <Fontisto name="home" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Analise"
        component={Analyze}
        options={{
          headerTitle: "",
          drawerIcon: () => <Ionicons name="analytics" size={24} color="black" />,
        }}
      />
    </Drawer.Navigator>
  );
};
