import { ILoginPayload, IRegisterPayload } from "@auth/types/auth.type";
import { IUser } from "@auth/types/user.type";
import HttpServer from "@core/httpServer";
import { GenericResponse } from "@shared/types/response.type";

class AuthService {
  static login(payload: ILoginPayload): Promise<GenericResponse<IUser>> {
    return HttpServer.post<GenericResponse<IUser>>("auth/login", payload);
  }

  static register(payload: IRegisterPayload): Promise<GenericResponse<IUser>> {
    return HttpServer.post<GenericResponse<IUser>>("auth/register", payload);
  }

  static refreshMe(): Promise<GenericResponse<IUser>> {
    return HttpServer.get<GenericResponse<IUser>>("auth/refreshMe");
  }
}

export default AuthService;
