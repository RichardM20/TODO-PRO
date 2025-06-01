import { IType } from "./type.type";

export interface ITask {
  id?: string;
  userId?: string;
  content: string;
  type: IType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITasksPaginated {
  total: number;
  offset: number;
  limit: number;
  tasks: ITask[];
}

export interface ITaskContextType {
  tasks: ITask[] | undefined;
  allTasks: ITask[] | undefined;
  types: IType[] | undefined;
  isLoadingTasks: boolean;
  isLoadingTypes: boolean;
  taskError: string | undefined;
  typeError: string | undefined;
  activeFilter: TaskFilterType;
  refreshTasks: () => Promise<ITask[] | null>;
  refreshTypes: () => Promise<IType[] | null>;
  addTask: (task: ITask) => Promise<void>;
  addType: (type: IType) => Promise<void>;
  updateTask: (task: ITask) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  changeFilter: (filter: TaskFilterType) => void;
}

export type TaskFilterType = "all" | "today" | "week";
export type TaskListFilterType = "date-asc" | "date-desc";
