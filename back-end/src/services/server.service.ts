import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";

import connectDB from "@config/database.config";
import ENV from "@config/env.config";
import AuthController from "@controllers/auth.controller";
import TasksController from "@controllers/task.controller";
import AuthRoutes from "@routes/auth.route";
import TaskRoutes from "@routes/tasks.route";
import AuthService from "@services/auth.service";
import TasksService from "@services/task.service";
import logger from "@utils/logger";


class Server {
  private app: Application;
  private port: string | number;
  private paths: { [key: string]: string };

  constructor() {
    this.app = express();
    this.port = ENV.PORT;
    this.paths = {
      auth: "/api/auth",
      tasks: "/api/tasks",
    };
    this.connectDB();
    this.middleware();
    this.routes();
  }

  private async connectDB(): Promise<void> {
    await connectDB();
  }

  private middleware(): void {
    this.app.use(express.json());
    this.app.use(cors(

    ));
    this.app.use(helmet());
  }

  private routes(): void {
    const authService = new AuthService();
    const authController = new AuthController(authService);
    const authRoutes = AuthRoutes(authController);

    //taks ->

    const tasksService = new TasksService();
    const tasksController = new TasksController(tasksService);
    const taskRoutes = TaskRoutes(tasksController);

    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.tasks, taskRoutes);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
