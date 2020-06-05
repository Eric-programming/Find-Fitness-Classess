import { IProfileTrainingClass } from "./../_models/IProfile";
import { ITrainingClassEnvelope } from "./../_models/ITrainingClasses";
import { _name_tokenName } from "./../_constantVariables/_names";
import { IUserFormValues } from "./../_models/IUser";
import {
  _api_user,
  _api_login,
  _api_signup,
  _api_attend,
  _api_profile,
  _api_add_photo,
  _api_remove_photo,
  _api_follow,
} from "./../_constantVariables/_apiLinks";
import axios, { AxiosResponse } from "axios";
import { _api_trainingClassess } from "../_constantVariables/_apiLinks";
import { ITrainingClass } from "../_models/ITrainingClasses";
import { history } from "../..";
import { IUser } from "../_models/IUser";
import { IProfile, IProfileEdit } from "../_models/IProfile";
import { IPhoto } from "../_models/IPhoto";
import { baseUrl } from "../_constantVariables/_base";
axios.defaults.baseURL = baseUrl;

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
  const { status, data, config } = response;
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
    window.localStorage.removeItem(_name_tokenName);
    history.push("/");
    alert("Your session has expired, please login again");
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
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};
const TrainingClass = {
  list: (axiosParams: URLSearchParams): Promise<ITrainingClassEnvelope> =>
    axios
      .get(_api_trainingClassess, { params: axiosParams })
      .then(responseBody),
  details: (id: string) => requests.get(`${_api_trainingClassess}/${id}`),
  createClass: (trainingClass: ITrainingClass) =>
    requests.post(`${_api_trainingClassess}`, trainingClass),
  updateClass: (TrainingClass: ITrainingClass) =>
    requests.put(`${_api_trainingClassess}/${TrainingClass.id}`, TrainingClass),
  deleteClass: (id: string) => requests.del(`${_api_trainingClassess}/${id}`),
  attend: (id: string) =>
    requests.post(`${_api_trainingClassess}/${id}${_api_attend}`, {}),
  unAttend: (id: string) =>
    requests.del(`${_api_trainingClassess}/${id}${_api_attend}`),
};
const User = {
  current: (): Promise<IUser> => requests.get(_api_user),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(_api_user + _api_login, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(_api_user + _api_signup, user),
};
const Profile = {
  getProfile: (username: string): Promise<IProfile> =>
    requests.get(`${_api_profile}/${username}`),
  getProfileTrainingClassess: (
    username: string,
    isHost: boolean
  ): Promise<IProfileTrainingClass[]> =>
    requests.get(
      `${_api_profile}/${username}${_api_trainingClassess}?isHost=${isHost}`
    ),
  addPhoto: (photo: Blob): Promise<IPhoto> =>
    requests.postForm(_api_user + _api_add_photo, photo),
  deletePhoto: (userName: string): Promise<IPhoto> =>
    requests.del(_api_user + _api_remove_photo + "/" + userName),
  editProfile: (editUser: IProfileEdit): Promise<IProfileEdit> =>
    requests.put(_api_user, editUser),
  follow: (username: string) => requests.post(`${_api_follow}/${username}`, {}),
  unfollow: (username: string) => requests.del(`${_api_follow}/${username}`),
  listFollowings: (username: string, predicate: boolean) =>
    requests.get(`${_api_follow}/${username}/${predicate}`),
};
export default {
  TrainingClass,
  User,
  Profile,
};
