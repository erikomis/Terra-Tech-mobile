import { AdapterHttp, api } from "./api";

export const photosService = {
  list(id: string, url: string) {
    return AdapterHttp.request(url, "GET", {
      id,
    });
  },
  deletePhoto(id: string) {
    return AdapterHttp.request(`photos/${id}/`, "DELETE");
  },
  analise(month: string) {
    return AdapterHttp.request(`photos/filter/?month=${month}`, "GET", );
  },
  createPhoto(formData: any) {
    return AdapterHttp.request(
      "photos",
      "POST",
      {
        ...formData,
      },
      {
        "Content-Type": "multipart/form-data",
      }
    );
  },
  createPhotosImage(formData: any) {
    return api.post("photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
