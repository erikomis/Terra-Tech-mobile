import axios, { AxiosError, AxiosResponse } from "axios";

interface IReqErrorResponse {
  error?: boolean;
  message?: string;
  errors?: string | string[];
  status?: number;
}

const BASE_URL = "https://projetos-web.com/";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<Partial<IReqErrorResponse>>) => {
    let errorMessage: string | null = null;

    const rawErrors = error?.response?.data?.errors;
    if (Array.isArray(rawErrors) && rawErrors.length) {
      errorMessage = rawErrors.join(", ");
    } else if (typeof rawErrors === "string" && rawErrors) {
      errorMessage = rawErrors;
    }

    if (!errorMessage) errorMessage = error?.response?.data?.message ?? null;
    if (!errorMessage) errorMessage = error.message;

    const dataBuffer = error.response?.data;

    if (dataBuffer instanceof ArrayBuffer) {
      try {
        const decoded = JSON.parse(new TextDecoder().decode(dataBuffer));
        if (decoded?.message) errorMessage = decoded.message;
      } catch {
        // ignore decode errors
      }
    } else if (dataBuffer instanceof Blob) {
      try {
        const text = await new Response(dataBuffer).text();
        const decoded = JSON.parse(text || "{}");
        if (decoded?.message) errorMessage = decoded.message;
      } catch {
        // ignore decode errors
      }
    }

    const responseErrorModel: IReqErrorResponse = {
      message: errorMessage ?? undefined,
      errors: error?.response?.data?.errors,
      status: error?.response?.status,
      error: true,
    };

    return responseErrorModel;
  }
);

export const AdapterHttp = {
  request: async (
    url: string,
    method: string,
    data?: unknown,
    headers?: Record<string, string>
  ) => {
    const response = await api({ url, method, data, headers });
    return response;
  },
  clearToken: () => {
    delete api.defaults.headers.common["Authorization"];
  },
  setToken: (token: string) => {
    api.defaults.headers.common["Authorization"] = `token ${token}`;
  },
};
