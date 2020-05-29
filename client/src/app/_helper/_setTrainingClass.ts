import { IUser } from "./../_models/IUser";
import { ITrainingClass } from "./../_models/ITrainingClasses";
export const _setTrainingClass = (tc: ITrainingClass, user: IUser) => {
  tc.isGoing = tc.userTrainingClasses.some((x) => x.userName == user.userName);
  tc.isHost = tc.userTrainingClasses.some((x) => x.isHost);
  tc.hostName = tc.userTrainingClasses.filter((x) => x.isHost)[0].fullName;
  return tc;
};
