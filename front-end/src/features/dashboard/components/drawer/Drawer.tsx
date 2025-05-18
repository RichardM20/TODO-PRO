"use client";

import { ClipboardList, LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuthContext } from "@auth/context/authContext";
import { useDashboardContext } from "@dashboard/context/drawerContext";
import { useTaskData } from "@dashboard/hooks/useTask";
import { useTypeData } from "@dashboard/hooks/useTypes";
import { IDrawerProps } from "@dashboard/types/drawer.type";
import { TaskFilterType } from "@dashboard/types/task.type";
import { getTypeColor } from "@dashboard/utils/colors";
import { DRAWER_ITEMS } from "@shared/constants/drawer_items";

import DrawerAddItem from "./components/DrawerAddItem";
import DrawerItem from "./components/DrawerItem";
import DrawerSection from "./components/DrawerSection";

const Drawer = ({ className }: IDrawerProps) => {
  const { closeDrawer } = useDashboardContext();
  const { user } = useAuthContext();
  const { types, isLoading } = useTypeData();
  const { changeFilter } = useTaskData();

  const defaultFilter: TaskFilterType = (DRAWER_ITEMS.find(
    (item) => item.type === "all"
  )?.type || DRAWER_ITEMS[0]?.type) as TaskFilterType;

  const [activeItem, setActiveItem] = useState<TaskFilterType>(defaultFilter);

  const handleItemClick = (filter: TaskFilterType) => {
    setActiveItem(filter);
    changeFilter(filter);
  };

  const handleAddList = () => {
    console.log("Add new list");
  };

  useEffect(() => {
    changeFilter(defaultFilter);
  }, []);

  if (isLoading) {
    return <></>;
  }
  return (
    <div className={`h-full bg-white border-r border-gray-50 ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{`${user?.name}`}</h2>
        <button
          type="button"
          onClick={closeDrawer}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <DrawerSection title="TASKS">
          {DRAWER_ITEMS.map((item) => (
            <DrawerItem
              key={`key ${item.type}`}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.type}
              onClick={() => handleItemClick(item.type)}
            />
          ))}
        </DrawerSection>

        <DrawerSection title="Types">
          {types?.length ? (
            types.map((type, index) => (
              <DrawerItem
                key={type.id}
                icon={<ClipboardList size={16} />}
                label={"example"}
                count={type.taskCount}
                className={`${getTypeColor(index)}`}
                isActive={activeItem === type.name}
              />
            ))
          ) : (
            <p className="flex px-3 py-2 text-sm text-gray-500">
              No types available
            </p>
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
