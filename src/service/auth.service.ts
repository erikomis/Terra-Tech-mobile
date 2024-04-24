import { AdapterHttp } from "./api";

export const authService = {
  async login(email: string, password: string) {
    const response = await AdapterHttp.request("login/", "POST", {
      email,
      password,
    });
    if (response.status === 200) {
      await AdapterHttp.setToken(response.data.token);
    }
    return response;
  },
  async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
    const response = await AdapterHttp.request("create-user/", "POST", {
      email,
      first_name,
      last_name,
      password,
    });
    return response;
  },

  async logout() {
    const response = await AdapterHttp.request("logout/", "POST");
    AdapterHttp.clearToken();
    return response;
  },

  async forgotPassword(email: string) {
    const response = await AdapterHttp.request("forgot-password/", "POST", {
      email,
    });
    return response;
  },
  async verifyToken(token: string) {
    const response = await AdapterHttp.request(`verify-token/`, "POST", {
      token,
    });
    return response;
  },
  async resetPassword(password: string, token: string) {
    const response = await AdapterHttp.request("reset-password/", "POST", {
      password,
      token,
    });
    return response;
  },
};
