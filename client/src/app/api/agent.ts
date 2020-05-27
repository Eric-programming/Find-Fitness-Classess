import { _name_tokenName } from "./../_constantVariables/_names";
import { IUserFormValues } from "./../_models/IUser";
import {
  _api_user,
  _api_login,
  _api_signup,
} from "./../_constantVariables/_apiLinks";
import axios, { AxiosResponse } from "axios";
import { _api_trainingClassess } from "../_constantVariables/_apiLinks";
import { ITrainingClass } from "../_models/ITrainingClasses";
import { history } from "../..";
import { IUser } from "../_models/IUser";
axios.defaults.baseURL = "http://localhost:4000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem(_name_tokenName);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (err) => {
  const { response, message } = err;
  if (message === "Network Error" && !response) {
    alert(
      "Sorry! Our server is down. Don't worry, your data won't be lost. Eric is currently working to resolve this issue."
    );
  }
  const { status, data, config, errors } = response;
  if (
    status === 404 ||
    (status === 400 &&
      config.method === "get" &&
      data.errors.hasOwnProperty("id"))
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    alert(
      "Something wrong with our server, please come back to this later. Thanks!"
    );
  }
  if (status === 401) {
    alert("You are unauthorized");
  }
  if (config.url === _api_user + _api_signup && status === 400) {
    for (let [key, value] of Object.entries(data.errors)) {
      alert(`${key}: ${value}`);
    }
  }
  return err.response;
});

const responseBody = (res: AxiosResponse) => res?.data;

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
const User = {
  current: (): Promise<IUser> => requests.get(_api_user),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(_api_user + _api_login, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(_api_user + _api_signup, user),
};
export default {
  TrainingClass,
  User,
};
