import axiosInstance from "../../utils/AxiosConfiguration";

const DEFAULT_ROUTER = "genders";

export function getAllList () {
  return axiosInstance.get(`/${DEFAULT_ROUTER}/alllist`);
}

