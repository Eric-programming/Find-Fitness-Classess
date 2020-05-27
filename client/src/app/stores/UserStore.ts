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
      this.user = user;
      if (user) {
        history.push(trainingClassessLink);
      }
      //   this.rootStore.commonStore.setToken(user.token);
      //   this.rootStore.modalStore.closeModal();
    } catch (error) {
      console.log("error", error);

      // alert(error);
    }
  };

  @action register = async (values: IUserFormValues) => {
    console.log("values", values);
    // try {
    //   const user = await agent.User.register(values);
    //   this.user = user;
    //   //   this.rootStore.commonStore.setToken(user.token);
    //   //   this.rootStore.modalStore.closeModal();
    //   history.push("/activities");
    // } catch (error) {
    //   throw error;
    // }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logout = () => {
    // this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
