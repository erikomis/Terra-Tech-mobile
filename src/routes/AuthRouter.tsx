import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/login/Login";
import { Register } from "../screens/register/Register";
import { Welcome } from "../screens/welcome/Welcome";
import { ForgotPassword } from "../screens/forgotPassword/ForgotPassword";
import { VerifyCode } from "../screens/verifyCode/Verifycode";
import { ResetPassword } from "../screens/resetPassword/ResetPassword";
import { AuthStackParamList } from "./types";
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const sharedHeaderOptions = {
  headerTitle: "",
  headerTransparent: true,
  headerStyle: { backgroundColor: colors.primary },
};

export const AuthRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={sharedHeaderOptions} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={sharedHeaderOptions} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} options={sharedHeaderOptions} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={sharedHeaderOptions} />
    </Stack.Navigator>
  );
};
