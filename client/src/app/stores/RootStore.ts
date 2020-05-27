import { configure } from "mobx";
import TrainingClassStore from "./TrainingClassStore";
import UserStore from "./UserStore";
import { createContext } from "react";
import UtilStore from "./utilStore";

// configure({ enforceActions: "always" });

export class RootStore {
  trainingClassessStore: TrainingClassStore;
  userStore: UserStore;
  utilStore: UtilStore;
  constructor() {
    this.trainingClassessStore = new TrainingClassStore(this);
    this.userStore = new UserStore(this);
    this.utilStore = new UtilStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
