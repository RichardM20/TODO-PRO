import { IType } from "@dashboard/types/type.type";

export interface IGenericDropdown {
  types: IType[] ;
  onSelect: (type: IType) => void;
  placeholder?: string;
  defaultValue?: IType | null
}
