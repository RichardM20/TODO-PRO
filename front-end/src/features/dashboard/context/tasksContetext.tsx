"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import TasksService from "@dashboard/services/tasks.service";
import {
  ITask,
  ITaskContextType,
  TaskFilterType,
} from "@dashboard/types/task.type";
import { IType } from "@dashboard/types/type.type";
import { filterTasks } from "@dashboard/utils/filter";
import TypeServices from "@features/dashboard/services/type.service";
import { useAsyncState } from "@shared/hooks/useAsyncState";

const TaskContext = createContext<ITaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const tasksState = useAsyncState<ITask[]>();
  const typesState = useAsyncState<IType[]>();

  const [filteredTasks, setFilteredTasks] = useState<ITask[]>();
  const [activeFilter, setActiveFilter] = useState<TaskFilterType>("all");
  const initialized = useRef(false);

  const refreshTasks = async (): Promise<ITask[] | null> => {
    tasksState.setIsLoading(true);
    tasksState.setError(undefined);

    try {
      const res = await TasksService.getAllTasks();
      const tasksData = res.data.tasks;
      tasksState.setData(tasksData);
      return tasksData;
    } catch {
      tasksState.setError("Error getting tasks");
      return null;
    } finally {
      tasksState.setIsLoading(false);
    }
  };

  const refreshTypes = async (): Promise<IType[] | null> => {
    typesState.setIsLoading(true);
    typesState.setError(undefined);

    try {
      const res = await TypeServices.getAllTypes();
      const typesData = res.data;
      typesState.setData(typesData);
      return typesData;
    } catch {
      typesState.setError("Error getting types");
      return null;
    } finally {
      typesState.setIsLoading(false);
    }
  };

  const addTask = async (task: ITask): Promise<boolean> => {
    tasksState.setIsLoading(true);
    tasksState.setError(undefined);

    try {
      await TasksService.addTask(task);
      await refreshTasks();
      await refreshTypes();
      return true;
    } catch {
      tasksState.setError("Error adding task");
      return false;
    } finally {
      tasksState.setIsLoading(false);
    }
  };

  const updateTask = async (task: ITask): Promise<boolean> => {
    tasksState.setIsLoading(true);
    tasksState.setError(undefined);

    try {
      await TasksService.updateTask(task);
      await refreshTasks();
      await refreshTypes();
      return true;
    } catch {
      tasksState.setError("Error updating task");
      return false;
    } finally {
      tasksState.setIsLoading(false);
    }
  };

  const changeFilter = (filter: TaskFilterType): void => {
    setActiveFilter(filter);
    setFilteredTasks(filterTasks(tasksState.data, filter));
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      refreshTasks();
      refreshTypes();
    }
  }, []);

  useEffect(() => {
    setFilteredTasks(filterTasks(tasksState.data, activeFilter));
  }, [tasksState.data, activeFilter]);

  const value = {
    tasks: filteredTasks,
    allTasks: tasksState.data,
    types: typesState.data,
    isLoadingTasks: tasksState.isLoading,
    isLoadingTypes: typesState.isLoading,
    taskError: tasksState.error,
    typeError: typesState.error,
    activeFilter,
    refreshTasks,
    refreshTypes,
    addTask,
    changeFilter,
    updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
