import { TaskListFilterType } from "./task.type";

export interface ITaskListHeaderProps {
  activeFilter: TaskListFilterType;
  setActiveFilter: (filter: TaskListFilterType) => void;
  deleteMode: boolean;
  selectedTasksCount: number;
  isDeleting: boolean;
  onToggleDeleteMode: () => void;
  onConfirmDelete: () => void;
}
