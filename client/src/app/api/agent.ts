import axios, { AxiosResponse } from "axios";
import { TrainingClassURL } from "./ConstVariables";
import { ITrainingClass } from "../../Interfaces/ITrainingClasses";
axios.defaults.baseURL = "http://localhost:4000/api";
const responseBody = (res: AxiosResponse) => res.data;
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};
const TrainingClass = {
  list: (): Promise<ITrainingClass[]> => requests.get(TrainingClassURL),
  details: (id: string) => requests.get(`${TrainingClassURL}/${id}`),
  createClass: (trainingClass: ITrainingClass) =>
    requests.post(`${TrainingClassURL}`, trainingClass),
  updateClass: (TrainingClass: ITrainingClass) =>
    requests.put(`${TrainingClassURL}/${TrainingClass.id}`, TrainingClass),
  deleteClass: (id: string) => requests.del(`${TrainingClassURL}/${id}`),
};

export default {
  TrainingClass,
};
