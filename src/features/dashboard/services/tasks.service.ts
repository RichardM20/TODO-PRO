import HttpServer from "../../../core/httpServer";
import { GenericResponse } from "../../../shared/types/response.type";
import { ITask, ITasksPaginated } from "../types/task.type";

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

  deleteTask(taskId: string): Promise<GenericResponse<boolean>> {
    return HttpServer.delete<GenericResponse<boolean>>(`tasks/${taskId}`);
  }
}

export default new TasksService();
