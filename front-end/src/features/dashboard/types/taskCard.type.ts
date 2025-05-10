import { ITask } from "./task.type";

export interface ITaskCardProps {
  backgroundColor?: string;
  task: ITask
  width?: string;
  height?: string;
  square?: boolean;
  fullWidth?: boolean;
  fixedHeight?: boolean;
  onClick: ()=>void;
}

export interface IAddTaskCard {
  onClick: () => void;
  square?: boolean;
}
