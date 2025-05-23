"use client";

import { Check, ClipboardList, LogOut, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAuthContext } from "@auth/context/authContext";
import useAuth from "@auth/hooks/useAuth.hook";
import { useDashboardContext } from "@dashboard/context/drawerContext";
import { useTaskData } from "@dashboard/hooks/useTask";
import { useTypeData } from "@dashboard/hooks/useTypes";
import { IDrawerProps } from "@dashboard/types/drawer.type";
import { TaskFilterType } from "@dashboard/types/task.type";
import { getTypeColor } from "@dashboard/utils/colors";
import { DRAWER_ITEMS } from "@shared/constants/drawer_items";

import InputField from "../../../../shared/components/inputs/FieldForm";
import Toast from "../../../../shared/components/toast/Toast";

import DrawerAddItem from "./components/DrawerAddItem";
import DrawerItem from "./components/DrawerItem";
import DrawerSection from "./components/DrawerSection";

const Drawer = ({ className }: IDrawerProps) => {
  const { closeDrawer } = useDashboardContext();
  const { user } = useAuthContext();
  const { logout } = useAuth();
  const { types, isLoading, addType } = useTypeData();
  const { changeFilter } = useTaskData();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const defaultFilter: TaskFilterType = (DRAWER_ITEMS.find(
    (item) => item.type === "all"
  )?.type || DRAWER_ITEMS[0]?.type) as TaskFilterType;

  const [activeItem, setActiveItem] = useState<TaskFilterType>(defaultFilter);
  const [isAddingNewType, setIsAddingNewType] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleItemClick = (filter: TaskFilterType) => {
    setActiveItem(filter);
    changeFilter(filter);
  };

  const handleAddListClick = () => {
    setIsAddingNewType(true);
  };

  const handleCancelAdd = () => {
    setIsAddingNewType(false);
    setNewTypeName("");
  };
  const handleSaveNewType = async () => {
    if (newTypeName.trim() === "") return;

    try {
      await addType({ name: newTypeName });

      setNewTypeName("");
      setIsAddingNewType(false);
    } catch (error) {
      setToastMessage(`Failed to add new type: ${error}`);
      setShowToast(true);
    }
  };

  useEffect(() => {
    changeFilter(defaultFilter);
  }, []);

  useEffect(() => {
    if (isAddingNewType && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingNewType]);

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
                label={type.name}
                count={type.taskCount}
                className={`${getTypeColor(index)}`}
                isActive={activeItem === type.name}
                onClick={() => handleItemClick(type.name as TaskFilterType)}
              />
            ))
          ) : (
            <p className="flex px-3 py-2 text-sm text-gray-500">
              No types available
            </p>
          )}

          {isAddingNewType ? (
            <div className="flex items-center justify-center gap-2 px-3 py-2">
              <InputField
                name="newType"
                type="text"
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
              />
              <button
                onClick={handleSaveNewType}
                className="p-1 rounded-md hover:bg-green-100 text-green-600"
                aria-label="Save new list"
              >
                <Check size={20} />
              </button>
              <button
                onClick={handleCancelAdd}
                className="p-1 rounded-md hover:bg-red-100 text-red-600"
                aria-label="Cancel new list"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <DrawerAddItem label="Add New List" onClick={handleAddListClick} />
          )}
        </DrawerSection>

        <DrawerItem
          icon={<LogOut size={16} />}
          label="Sign out"
          onClick={logout}
        />
      </div>
      <Toast
        key={"toast"}
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
        type="error"
        title="Ops, something went wrong"
      />
    </div>
  );
};

export default Drawer;
