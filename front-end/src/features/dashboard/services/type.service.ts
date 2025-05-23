import HttpServer from "@core/httpServer";
import { IType } from "@dashboard/types/type.type";
import { GenericResponse } from "@shared/types/response.type";

class TypeServices {
  getAllTypes(): Promise<GenericResponse<IType[]>> {
    return HttpServer.get<GenericResponse<IType[]>>("types");
  }

  addType(type: IType): Promise<GenericResponse<boolean>> {
    return HttpServer.post<GenericResponse<boolean>>("types", type);
  }
}

export default new TypeServices();
