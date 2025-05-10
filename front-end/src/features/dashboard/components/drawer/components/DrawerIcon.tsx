"use client";

import { IDrawerIconProps } from "@dashboard-types/drawer.type";
import { Menu } from "lucide-react";


const DrawerToggleIcon = (props: IDrawerIconProps) => {
  return (
    <button
      type="button"
      className="fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md"
      onClick={props.onClick}
    >
      <Menu size={20} />
    </button>
  );
};

export default DrawerToggleIcon;
