import HttpServer from "../../../core/httpServer";
import { GenericResponse } from "../../../shared/types/response.type";
import { IType } from "../types/type.type";

class TypeServices {
  getAllTypes(): Promise<GenericResponse<IType[]>> {
    return HttpServer.get<GenericResponse<IType[]>>("types");
  }

  addType(type: IType): Promise<GenericResponse<boolean>> {
    return HttpServer.post<GenericResponse<boolean>>("types", type);
  }
}

export default new TypeServices();
