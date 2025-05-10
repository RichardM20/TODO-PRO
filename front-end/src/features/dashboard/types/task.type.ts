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
  types: IType[] | undefined;
  isLoadingTasks: boolean;
  isLoadingTypes: boolean;
  taskError: string | undefined;
  typeError: string | undefined;
  refreshTasks: () => Promise<ITask[] | null>;
  refreshTypes: () => Promise<IType[] | null>;
  addTask: (task: ITask) => Promise<boolean>;
}