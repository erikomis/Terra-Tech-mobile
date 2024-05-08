import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/login/Login";
import { Register } from "../screens/register/Register";
import { Welcome } from "../screens/welcome/Welcome";
import { ForgotPassword } from "../screens/forgotPassword/ForgotPassword";

import { VerifyCode } from "../screens/verifyCode/Verifycode";
import { ResetPassword } from "../screens/resetPassword/ResetPassword";

const Stack = createNativeStackNavigator();

export const AuthRouter = () => {
  return (
    <Stack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "#28502e",
          },
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "#28502e",
          },
        }}
      />

      <Stack.Screen
        name="VerifyCode"
        component={VerifyCode}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "#28502e",
          },
        }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerStyle: {
            backgroundColor: "#28502e",
          },
        }}
      />
      </Stack.Navigator>
  );
};
