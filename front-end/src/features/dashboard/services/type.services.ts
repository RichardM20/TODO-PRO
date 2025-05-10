import HttpServer from "@core/httpServer";
import storage from "@core/storage";
import { IType } from "@dashboard-types/type.type";
import { GenericResponse } from "@shared/types/response.type";

class TypeServices {
  private get accessToken(): string {
    return storage.getToken() ?? "";
  }

  getAllTypes(): Promise<GenericResponse<IType[]>> {
    return HttpServer.get<GenericResponse<IType[]>>("types", {
      Authorization: `${this.accessToken}`,
    });
  }

  addType(type: IType): Promise<GenericResponse<boolean>> {
    return HttpServer.post<GenericResponse<boolean>>("types", type, {
      Authorization: `${this.accessToken}`,
    });
  }
}

export default new TypeServices();
