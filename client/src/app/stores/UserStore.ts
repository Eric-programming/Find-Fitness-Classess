import { trainingClassessLink } from "./../_constantVariables/_Links";
import { observable, computed, action } from "mobx";
import agent from "../api/agent";
import { history } from "../..";
import { IUserFormValues, IUser } from "../_models/IUser";
import { RootStore } from "./RootStore";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }
  @action changeImage = (url: string | null) => {
    if (this.user) {
      this.user.image = url;
    }
  };
  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      this.user = user;
      if (user) {
        history.push(trainingClassessLink);
        this.rootStore.utilStore.setToken(user.token);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      console.log("user", user);
      if (user.token) {
        this.user = user;
        this.rootStore.utilStore.setToken(user.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  @action getUser = async () => {
    try {
      this.user = await agent.User.current();
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    this.rootStore.utilStore.setToken(null);
    this.rootStore.trainingClassessStore.resetTC();
    this.rootStore.profileStore.resetProfile();
    this.user = null;
    history.push("/");
  };
}
