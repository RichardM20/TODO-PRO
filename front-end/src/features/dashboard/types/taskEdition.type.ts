import { ITask } from "./task.type";
import { IType } from "./type.type";

export interface ITaskContentEditionProps {
  task?: ITask;
  isLoading?: boolean;
  types: IType[] | undefined;
  onSave: (content: string, type: IType) => void;
  onCancel: () => void;
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}
