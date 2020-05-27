export interface IUser {
  userName: string;
  fullName: string;
  token: string;
  image?: string;
}

export interface IUserFormValues {
  email: string;
  password: string;
  fullName?: string;
  userName?: string;
}
