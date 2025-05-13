import HttpServer from "@core/httpServer";
import storage from "@core/storage";
import { ITask, ITasksPaginated } from "@dashboard/types/task.type";
import { GenericResponse } from "@shared/types/response.type";

class TasksService {
  private get accessToken(): string {
    return storage.getToken() ?? "";
  }

  getAllTasks(): Promise<GenericResponse<ITasksPaginated>> {
    return HttpServer.get<GenericResponse<ITasksPaginated>>("tasks", {
      Authorization: `${this.accessToken}`,
    });
  }

  addTask(task: ITask): Promise<GenericResponse<boolean>> {
    return HttpServer.post<GenericResponse<boolean>>("tasks", task, {
      Authorization: `${this.accessToken}`,
    });
  }
}

export default new TasksService();
