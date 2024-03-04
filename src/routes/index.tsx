import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "../screens/login/Login";
import { Register } from "../screens/register/Register";
import { Welcome } from "../screens/welcome/Welcome";
import { ForgotPassword } from "../screens/forgotPassword/ForgotPassword";
import { useContextAuth } from "../context/Auth.context";
import { Home } from "../screens/home/Home";

const Stack = createNativeStackNavigator();

export const Router = () => {
  const { user } = useContextAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
        {!user?.id && (
          <>
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
          </>
        )}

        {user && user.id && ( 
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle : ''
              }}
            />
          </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};
