"use client";

import { IDrawerProps } from "@dashboard-types/drawer.type";
import { ClipboardList, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { DRAWER_ITEMS } from "../../../../shared/constants/drawer_items";
import { useAuthContext } from "../../../auth/context/authContext";
import { useDashboardContext } from "../../context/drawerContext";
import { useTypeData } from "../../hooks/useTypes";
import DrawerAddItem from "./components/DrawerAddItem";
import DrawerItem from "./components/DrawerItem";
import DrawerSearch from "./components/DrawerSearch";
import DrawerSection from "./components/DrawerSection";

const Drawer = ({ className }: IDrawerProps) => {
  const { closeDrawer } = useDashboardContext();
  const { user } = useAuthContext();
  const { types } = useTypeData();
  const [activeItem, setActiveItem] = useState("TODO PRO");

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  const handleAddList = () => {
    console.log("Add new list");
  };

  return (
    <div className={`h-full bg-white border-r border-gray-50 ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          {user?.user.name}
        </h2>
        <button
          type="button"
          onClick={closeDrawer}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <DrawerSearch placeholder="Search" />

        <DrawerSection title="TASKS">
          {DRAWER_ITEMS.map((item) => (
            <DrawerItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.label}
              onClick={() => handleItemClick(item.label)}
            />
          ))}
        </DrawerSection>

        <DrawerSection title="Types">
          {types?.length ? (
            types.map((type) => (
              <DrawerItem
                key={type.id}
                icon={<ClipboardList size={16} />}
                label={type.name}
                count={type.taskCount}
                isActive={activeItem === type.name}
                onClick={() => handleItemClick(type.name)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">No types available</p>
          )}
          <DrawerAddItem label="Add New List" onClick={handleAddList} />
        </DrawerSection>
        <DrawerItem
          icon={<LogOut size={16} />}
          label="Sign out"
          onClick={() => console.log("Sign out clicked")}
        />
      </div>
    </div>
  );
};

export default Drawer;
