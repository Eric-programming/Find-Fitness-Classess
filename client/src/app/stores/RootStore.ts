import TrainingClassStore from "./TrainingClassStore";
import UserStore from "./UserStore";
import { createContext } from "react";
import UtilStore from "./UtilStore";
import ProfileStore from "./ProfileStore";

export class RootStore {
  trainingClassessStore: TrainingClassStore;
  userStore: UserStore;
  utilStore: UtilStore;
  profileStore: ProfileStore;
  constructor() {
    this.trainingClassessStore = new TrainingClassStore(this);
    this.userStore = new UserStore(this);
    this.utilStore = new UtilStore(this);
    this.profileStore = new ProfileStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
