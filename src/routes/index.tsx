import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useContextAuth } from "../context/Auth.context";

import { AuthRouter } from "./AuthRouter";
import { View } from "react-native-animatable";
import { Text } from "react-native";
import { AppRouter } from "./AppRouter";

const Stack = createNativeStackNavigator();

export const Router = () => {
  const { user, loading, signOut } = useContextAuth();

  return (
    <NavigationContainer>
      {Object(user) && Object.keys(user).length > 0 ? (
        <AppRouter />
      ) : (
        <AuthRouter />
      )}
    </NavigationContainer>
  );
};
