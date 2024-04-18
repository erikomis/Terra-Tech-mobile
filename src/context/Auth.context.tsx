import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../service/auth.service";
import { HttpCode } from "../service/httpCode";

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextData {
  user: User | undefined;
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
  const [user, setUser] = useState<User>();
  const [verifyToken, setVerifyToken] = useState("");
  const [loading, setLoading] = useState(false);
  const clearVerifyToken = () => {
    setVerifyToken("");
  };

  const addToken = (token: string) => {
    setVerifyToken(token);
  };
  useEffect(() => {
    async function loadStorageData() {
      setLoading(true);
      const user = await AsyncStorage.getItem("@rn:auth:user");
      if (user) {
        setUser(JSON.parse(user));
      }

      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    // try {
    const response = await authService.login(email, password);
    if (response.status !== HttpCode.OK) {
      console.log(response);
      return {
        mensagem: "Email ou senha invalidos",
      };
    }
    await AsyncStorage.setItem(
      "@rn:auth:user",
      JSON.stringify({
        user: response.data.user,
        token: response.data.token,
      })
    );

    setUser(response.data.user);
  }

  async function register({
    name,
    lastName,
    email,
    password,
  }: RegisterCredentials) {
    const response = await authService.register(
      name,
      lastName,
      email,
      password
    );

    if (response.status !== HttpCode.CREATED) {
      return {
        mensagem: "Email ou senha invalidos",
      };
    }

    await AsyncStorage.setItem(
      "@rn:auth:user",
      JSON.stringify({
        id: response.data.user.id,
        name:
          response.data.user.first_name + " " + response.data.user.last_name,
        email: response.data.user.email,
        token: response.data.token,
      })
    );

    setUser({
      id: response.data.user.id,
      name: response.data.user.first_name + " " + response.data.user.last_name,
      email: response.data.user.email,
      token: response.data.token,
    });
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
        addToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useContextAuth = () => {
  return useContext(AuthContext);
};
