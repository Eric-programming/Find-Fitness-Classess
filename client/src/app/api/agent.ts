import axios, { AxiosResponse } from "axios";
import { _api_trainingClassess } from "../_constantVariables/_apiLinks";
import { ITrainingClass } from "../_models/ITrainingClasses";
axios.defaults.baseURL = "http://localhost:4000/api";

// axios.interceptors.response.use(undefined, (err) => console.error(err));

const responseBody = (res: AxiosResponse) => res.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};
const TrainingClass = {
  list: (): Promise<ITrainingClass[]> => requests.get(_api_trainingClassess),
  details: (id: string) => requests.get(`${_api_trainingClassess}/${id}`),
  createClass: (trainingClass: ITrainingClass) =>
    requests.post(`${_api_trainingClassess}`, trainingClass),
  updateClass: (TrainingClass: ITrainingClass) =>
    requests.put(`${_api_trainingClassess}/${TrainingClass.id}`, TrainingClass),
  deleteClass: (id: string) => requests.del(`${_api_trainingClassess}/${id}`),
};

export default {
  TrainingClass,
};
