import { _name_tokenName } from "./../_constantVariables/_names";
import { observable, action, reaction } from "mobx";
import { RootStore } from "./RootStore";

export default class UtilStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable token: string | null = window.localStorage.getItem(
    _name_tokenName
  );
  @observable AccountLoaded = false;

  @action setToken = (token: string | null) => {
    this.token = token;
    if (token) {
      window.localStorage.setItem(_name_tokenName, token);
    } else {
      window.localStorage.removeItem(_name_tokenName);
    }
  };

  @action setAccountLoaded = (value: boolean) => {
    this.AccountLoaded = value;
  };
}
