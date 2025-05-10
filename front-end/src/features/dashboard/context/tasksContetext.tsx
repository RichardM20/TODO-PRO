"use client";

import TasksService from "@dashboard-services/tasks.service";
import TypeServices from "@dashboard-services/type.services";
import { ITask, ITaskContextType } from "@dashboard-types/task.type";
import { IType } from "@dashboard-types/type.type";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';


const TaskContext = createContext<ITaskContextType | undefined>(undefined);


interface TaskProviderProps {
  children: ReactNode;
}


export const TaskProvider = ({ children }: TaskProviderProps) => {

  const [tasks, setTasks] = useState<ITask[]>();
  const [types, setTypes] = useState<IType[]>();
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState<boolean>(false);
  const [taskError, setTaskError] = useState<string>();
  const [typeError, setTypeError] = useState<string>();
  const initialized = useRef(false);


  const refreshTasks = async (): Promise<ITask[] | null> => {
    setIsLoadingTasks(true);
    setTaskError(undefined);

    try {
      const res = await TasksService.getAllTasks();
      const tasksData = res.data.tasks;
      setTasks(tasksData);
      return tasksData;
    } catch (err: any) {
      const errorMessage = err?.message || "Error getting tasks";
      setTaskError(errorMessage);
      return null;
    } finally {
      setIsLoadingTasks(false);
    }
  };


  const refreshTypes = async (): Promise<IType[] | null> => {
    setIsLoadingTypes(true);
    setTypeError(undefined);

    try {
      const res = await TypeServices.getAllTypes();
      const typesData = res.data;
      setTypes(typesData);
      return typesData;
    } catch (err: any) {
      const errorMessage = err?.message || "Error getting types";
      setTypeError(errorMessage);
      return null;
    } finally {
      setIsLoadingTypes(false);
    }
  };


  const addTask = async (task: ITask): Promise<boolean> => {
    setIsLoadingTasks(true);
    setTaskError(undefined);

    try {
      await TasksService.addTask(task);
      await refreshTasks();
      await refreshTypes();
      return true;
    } catch (err: any) {
      const errorMessage = err?.message || "Error adding task";
      setTaskError(errorMessage);
      return false;
    } finally {
      setIsLoadingTasks(false);
    }
  };


  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      refreshTasks();
      refreshTypes();
    }
  }, []);


  const value = {
    tasks,
    types,
    isLoadingTasks,
    isLoadingTypes,
    taskError,
    typeError,
    refreshTasks,
    refreshTypes,
    addTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};


export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};