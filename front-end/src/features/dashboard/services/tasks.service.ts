import HttpServer from "@core/httpServer";
import { ITask, ITasksPaginated } from "@dashboard/types/task.type";
import { GenericResponse } from "@shared/types/response.type";

class TasksService {
  getAllTasks(): Promise<GenericResponse<ITasksPaginated>> {
    return HttpServer.get<GenericResponse<ITasksPaginated>>("tasks");
  }

  addTask(task: ITask): Promise<GenericResponse<boolean>> {
    return HttpServer.post<GenericResponse<boolean>>("tasks", task);
  }

  updateTask(task: ITask): Promise<GenericResponse<boolean>> {
    return HttpServer.put<GenericResponse<boolean>>(`tasks/${task.id}`, task);
  }
}

export default new TasksService();
