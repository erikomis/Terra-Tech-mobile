import { api } from "./api";

export const authService = {
  async login(email: string, password: string) {
    const response = await api.post("login/", {
      email,
      password,
    });
 
    return response;
  },
  async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    const response = await api.post("create-user/", {
      email,
      first_name,
      last_name,
      password,
    });
    return response;
  },

  async logout() {
    const response = await api.post("logout/");
    api.defaults.headers.common["Authorization"] = "";
    return response;
  },
};
