import HttpServer from "../../../core/httpServer";
import { GenericResponse } from "../../../shared/types/response.type";
import { ILoginPayload, IRegisterPayload } from "../types/auth.type";
import { IUser } from "../types/user.type";

class AuthService {
  static login(payload: ILoginPayload): Promise<GenericResponse<IUser>> {
    return HttpServer.post<GenericResponse<IUser>>("auth/login", payload);
  }

  static register(payload: IRegisterPayload): Promise<GenericResponse<IUser>> {
    return HttpServer.post<GenericResponse<IUser>>("auth/register", payload);
  }
  static logout(): Promise<GenericResponse<IUser>> {
    return HttpServer.post<GenericResponse<IUser>>("auth/logout");
  }

  static refreshMe(): Promise<GenericResponse<IUser>> {
    return HttpServer.get<GenericResponse<IUser>>("auth/refreshMe");
  }
}

export default AuthService;
