import { AdapterHttp, api } from "./api";

export const photosService = {
  list(url: string) {
    return AdapterHttp.request(url, "GET");
  },
  deletePhoto(id: string) {
    return AdapterHttp.request(`photos/${id}`, "DELETE");
  },
  analise(month: string) {
    return AdapterHttp.request(`photos/filter/?month=${month}`, "GET");
  },
  createPhotosImage(formData: FormData) {
    return api.post("photos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
