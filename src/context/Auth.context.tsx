import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../service/auth.service";
import { HttpCode } from "../service/httpCode";
import { AdapterHttp } from "../service/api";

export const AuthContext = createContext({} as AuthContextData);

interface AuthContextData {
  user: User;
  verifyToken: string;
  addToken: (token: string) => void;
  clearVerifyToken: () => void;
  signIn: (credentials: SignInCredentials) => Promise<{ message: string } | void>;
  register: (credentials: RegisterCredentials) => Promise<{ message: string } | void>;
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

  const clearVerifyToken = () => setVerifyToken("");
  const addToken = (token: string) => setVerifyToken(token);

  async function loadStorageData() {
    setLoading(true);
    try {
      const stored = await AsyncStorage.getItem("@rn:auth:user");
      if (stored) {
        const userParsed = JSON.parse(stored) as User;
        AdapterHttp.setToken(userParsed.token);
        setUser(userParsed);
      }
    } catch {
      // storage read failed, user stays logged out
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStorageData();
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    setLoading(true);
    try {
      const response = await authService.login(email, password);

      if (response.status === HttpCode.BAD_REQUEST) {
        return { message: "Email ou senha inválidos" };
      }
      if (response.status === HttpCode.INTERNAL_SERVER_ERROR) {
        return { message: "Ocorreu um erro, tente novamente mais tarde" };
      }

      const userData: User = {
        id: response.data.user.id,
        email: response.data.user.email,
        name: `${response.data.user.first_name} ${response.data.user.last_name}`,
        token: response.data.token,
      };

      await AsyncStorage.setItem("@rn:auth:user", JSON.stringify(userData));
      setUser(userData);
    } catch {
      return { message: "Ocorreu um erro, tente novamente mais tarde" };
    } finally {
      setLoading(false);
    }
  }

  async function register({ name, lastName, email, password }: RegisterCredentials) {
    setLoading(true);
    try {
      const response = await authService.register(name, lastName, email, password);
      if (response.status !== HttpCode.CREATED) {
        return { message: "Erro ao criar conta. Verifique os dados e tente novamente" };
      }
    } catch {
      return { message: "Ocorreu um erro, tente novamente mais tarde" };
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem("@rn:auth:user");
      await authService.logout();
    } finally {
      AdapterHttp.clearToken();
      setUser({} as User);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, signIn, signOut, register, loading, clearVerifyToken, verifyToken, addToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useContextAuth = () => useContext(AuthContext);
