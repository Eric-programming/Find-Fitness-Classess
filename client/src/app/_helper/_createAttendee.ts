import { IUser } from "./../_models/IUser";
export const _createAttendee = (user: IUser) => {
  console.log("user.image", user.image);
  return {
    userName: user.userName,
    fullName: user.fullName,
    image: user.image || null,

    isHost: false,
  };
};
