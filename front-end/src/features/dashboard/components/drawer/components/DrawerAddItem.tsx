"use client"

import { Plus } from "lucide-react";

import { IDrawerAddItemProps } from "@dashboard/types/drawer.type";

import DrawerItem from "./DrawerItem";



const DrawerAddItem = (props: IDrawerAddItemProps) => {
  return (
    <DrawerItem
      icon={<Plus size={16} />}
      label={props.label}
      onClick={props.onClick}
      className="text-gray-600 hover:text-gray-900"
    />
  )
}

export default DrawerAddItem
