import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../service/auth.service";
import { HttpCode } from "../service/httpCode";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextData {
  user: User;
  verifyToken: string;
  addToken: (token: string) => void;
  clearVerifyToken: () => void;
  signIn: (
    credentials: SignInCredentials
  ) => Promise<{ mensagem: string } | void>;
  register: (
    credentials: RegisterCredentials
  ) => Promise<{ mensagem: string } | void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}
interface RegisterCredentials {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [verifyToken, setVerifyToken] = useState("");
  const [loading, setLoading] = useState(false);

  const clearVerifyToken = () => {
    setVerifyToken("");
  };

  const addToken = (token: string) => {
    setVerifyToken(token);
  };

  async function loadStorageData() {
    setLoading(true);
    const user = await AsyncStorage.getItem("@rn:auth:user");
    if (user) {
      const userParsed = JSON.parse(user);
      setUser(userParsed);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    setLoading(true);
    const response = await authService.login(email, password);
    console.log(response);
    
    if (response.status === HttpCode.BAD_REQUEST) {
      setLoading(false);
      return {
        mensagem: "Email ou senha invalidos",
      };
    }

    if (response.status === HttpCode.INTERNAL_SERVER_ERROR) {
      setLoading(false);
      return {
        mensagem: "Ocorreu um erro , tente novamente mais tarde",
      };
    }

    await AsyncStorage.setItem(
      "@rn:auth:user",
      JSON.stringify({
        id: response.data.user.id,
        email: response.data.user.email,
        name:
          response.data.user.first_name + " " + response.data.user.last_name,
        token: response.data.token,
      })
    );

    setUser({
      id: response.data.user.id,
      name: response.data.user.first_name + " " + response.data.user.last_name,
      email: response.data.user.email,
      token: response.data.token,
    });
    setLoading(false);
  }

  async function register({
    name,
    lastName,
    email,
    password,
  }: RegisterCredentials) {
    setLoading(true);
    const response = await authService.register(
      name,
      lastName,
      email,
      password
    );
    if (response.status !== HttpCode.CREATED) {
      setLoading(false);
      return {
        mensagem: "Email ou senha invalidos",
      };
    }

    setLoading(false);
  }

  async function signOut() {
    await AsyncStorage.removeItem("@rn:auth:user");
    authService.logout();
    setUser({} as User);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        register,
        loading,
        clearVerifyToken,
        verifyToken,
        addToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useContextAuth = () => {
  return useContext(AuthContext);
};
