import { NavigationContainer } from "@react-navigation/native";
import { useContextAuth } from "../context/Auth.context";
import { AuthRouter } from "./AuthRouter";
import { AppRouter } from "./AppRouter";

export const Router = () => {
  const { user } = useContextAuth();
  return (
    <NavigationContainer>
      {Object.keys(user).length > 0 ? <AppRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
};
