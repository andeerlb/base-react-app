import axiosInstance from "@/configurations/AxiosConfiguration";

const DEFAULT_ROUTER = "persons";

export function getPageablePersonsWithFilter (filter = '', page = 0, size = 10, sort = '') {
  return axiosInstance.get(`/${DEFAULT_ROUTER}/allpageable/byfilter?name=${filter}&size=${size}&page=${page}&sort=${sort}`);
}

export function findById (id) {
  return axiosInstance.get(`/${DEFAULT_ROUTER}/${id}`);
}

export function save(person) {
  if(person?.id) {
    return axiosInstance.put(`${DEFAULT_ROUTER}/update/${person.id}`, person);
  }
  return axiosInstance.post(`${DEFAULT_ROUTER}/create`, person);
}

export function deleteById (id) {
  return axiosInstance.delete(`/${DEFAULT_ROUTER}/${id}`);
}
