import { IUser } from "./user.type";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload extends ILoginPayload {
  name?: string;
}


export interface IAuthUser {
  accessToken: string;
  user: IUser;
}
