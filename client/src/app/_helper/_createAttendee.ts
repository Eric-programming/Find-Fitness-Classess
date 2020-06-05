import { IUser } from "./../_models/IUser";
export const _createAttendee = (user: IUser) => {
  return {
    userName: user.userName,
    fullName: user.fullName,
    image: user.image || null,
    isHost: false,
  };
};
