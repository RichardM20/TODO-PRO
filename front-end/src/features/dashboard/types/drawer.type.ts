import { ReactNode } from "react";

export interface IDrawerAddItemProps {
  label: string;
  onClick: () => void;
}

export interface IDrawerItemProps {
  icon?: ReactNode;
  label: string;
  count?: number;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface IDrawerSearchProps {
  placeholder?: string;
  onChange?: (value: string) => void;
}
export interface IDrawerSectionProps {
  title: string;
  children: ReactNode;
}

export interface IDrawerTagProps {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

export interface IDrawerProps {
  className?: string;
}

export type DrawerContextType = {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
};

export interface IDrawerIconProps {
  onClick: () => void;
}
