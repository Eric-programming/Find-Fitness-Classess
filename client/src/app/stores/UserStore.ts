import { trainingClassessLink, homeLink } from "./../_constantVariables/_Links";
import { observable, computed, action, runInAction } from "mobx";
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

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      console.log("user", user);
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
      this.user = user;
      this.rootStore.utilStore.setToken(user.token);
      // if (user) {
      //   history.push(trainingClassessLink);
      // }
    } catch (error) {
      throw error;
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
    this.user = null;
    history.push("/");
  };
}
