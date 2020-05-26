import { configure } from "mobx";
import TrainingClassStore from "./TrainingClassStore";
import UserStore from "./UserStore";
import { createContext } from "react";

// configure({ enforceActions: "always" });

export class RootStore {
  trainingClassessStore: TrainingClassStore;
  userStore: UserStore;
  constructor() {
    this.trainingClassessStore = new TrainingClassStore(this);
    this.userStore = new UserStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
