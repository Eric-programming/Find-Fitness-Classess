export interface IUser {
  userName: string;
  fullName: string;
  token: string;
  image?: string | null;
}

export interface IUserFormValues {
  email: string;
  password: string;
  fullName?: string;
  userName?: string;
}
