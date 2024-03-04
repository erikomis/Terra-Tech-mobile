import { StatusBar } from "react-native";
import { AuthProvider } from "./src/context/Auth.context";
import { Router } from "./src/routes";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="black" barStyle="light-content"/>
      <Router />
    </AuthProvider>
  );
}
