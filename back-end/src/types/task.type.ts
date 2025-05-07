export interface ITask {
  id?: string;
  userId?: string;
  title: string;
  description?: string;
  type: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  priority: string;
}


export interface ITasksPaginated {
  total: number;
  offset: number;
  limit: number;
  tasks: ITask[];
}
