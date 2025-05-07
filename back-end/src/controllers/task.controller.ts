import { Response } from "express";

import TasksService from "@services/task.service";
import { ApiError } from "@utils/errors/api_errors";
import { HttpBadResponse, HttpResponse } from "@utils/http_response";
import logger from "@utils/logger";
import { AuthRequest } from "types/auth.type";
import { ITask } from "types/task.type";

class TasksController {
  private tasksService: TasksService;

  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  async getTasks(req: AuthRequest, res: Response) {
    const uid = req.uid;
    const { limit = 100, offset = 0 } = req.params;

    try {
      const tasks = await this.tasksService.getTasks(
        uid!,
        Number(limit),
        Number(offset)
      );

      HttpResponse(res, 200, "sucess", tasks);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        HttpBadResponse(res, error.statusCode, error.message, null);
      } else {
        HttpBadResponse(res, 500, error, null);
      }
    }
  }

  async addTasks(req: AuthRequest, res: Response) {
    const tasks: ITask = req.body;

    const userId = req.uid ?? "";

    try {
      await this.tasksService.addTasks(userId, tasks);
      HttpResponse(res, 200, "sucess", true);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        HttpBadResponse(res, error.statusCode, error.message, null);
      } else {
        HttpBadResponse(res, 500, error, null);
      }
    }
  }

  async deleteTask(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.uid ?? "";

    try {
      await this.tasksService.deleteTask(userId, id);
      HttpResponse(res, 200, "sucess", true);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        HttpBadResponse(res, error.statusCode, error.message, null);
      } else {
        HttpBadResponse(res, 500, error, null);
      }
    }
  }

  async updateTask(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.uid ?? "";
    const task: ITask = req.body;

    try {
      await this.tasksService.updateTask(userId, id, task);
      HttpResponse(res, 200, "sucess", true);
    } catch (error) {
      logger.error(error);
      if (error instanceof ApiError) {
        HttpBadResponse(res, error.statusCode, error.message, null);
      } else {
        HttpBadResponse(res, 500, error, null);
      }
    }
  }
}

export default TasksController;
