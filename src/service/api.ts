import axios, { AxiosError } from "axios";

interface IReqErrorResponse {
  error?: boolean;
  message?: string;
}


export const api = axios.create({
  baseURL: "https://projetos-web.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<Partial<IReqErrorResponse>>) => {
    // TODO: testar

    // const response = await refreshaccessToken(error);
    // return response;

    let errorMessage: any = null;
    if (!errorMessage?.length)
      errorMessage = error?.response?.data?.["errors" as never];
    if (!errorMessage?.length) errorMessage = error?.response?.data?.message;
    if (!errorMessage?.length) errorMessage = error.message;

    const dataBuffer = error.response?.data;

    if (dataBuffer instanceof ArrayBuffer) {
      const errorMessageDecode = JSON.parse(
        new TextDecoder().decode(dataBuffer)
      );
      if (errorMessageDecode?.message)
        errorMessage = errorMessageDecode.message;
    } else if (dataBuffer instanceof Blob) {
      const errorMessageDecode = await new Response(dataBuffer).text();
      if (errorMessageDecode)
        errorMessage = JSON.parse(errorMessageDecode || "{}");
    }

    const responseErrorModel: IReqErrorResponse & {
      status?: number;
      errors: any;
    } = {
      message: Array.isArray(errorMessage)
        ? errorMessage.join(", ")
        : errorMessage,
      errors: error?.response?.data?.["errors" as never],
      status: error?.response?.status,
      error: true,
    };
    return responseErrorModel;
  }
);
