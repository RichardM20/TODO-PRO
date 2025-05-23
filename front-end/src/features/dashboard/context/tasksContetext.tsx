"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import TasksService from "@dashboard/services/tasks.service";
import TypeServices from "@dashboard/services/type.service";
import {
  ITask,
  ITaskContextType,
  TaskFilterType,
} from "@dashboard/types/task.type";
import { IType } from "@dashboard/types/type.type";
import { filterTasks } from "@dashboard/utils/filter";
import { useAsyncState } from "@shared/hooks/useAsyncState";

import handleAsyncAction from "../utils/async_action";

const TaskContext = createContext<ITaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
  initialTasks?: ITask[];
  initialTypes?: IType[];
}

export const TaskProvider = ({
  children,
  initialTasks,
  initialTypes,
}: TaskProviderProps) => {
  const tasksState = useAsyncState<ITask[]>(initialTasks);
  const typesState = useAsyncState<IType[]>(initialTypes);

  const [filteredTasks, setFilteredTasks] = useState<ITask[]>();
  const [activeFilter, setActiveFilter] = useState<TaskFilterType>("all");

  const initialized = useRef(false);

  const refreshTasks = useCallback(() => {
    return handleAsyncAction(
      async () => {
        const res = await TasksService.getAllTasks();
        return res.data.tasks;
      },
      tasksState.setIsLoading,
      tasksState.setError,
      (tasksData) => {
        tasksState.setData(tasksData);
      }
    );
  }, [tasksState]);

  const refreshTypes = useCallback(() => {
    return handleAsyncAction(
      async () => {
        const res = await TypeServices.getAllTypes();
        return res.data;
      },
      typesState.setIsLoading,
      typesState.setError,
      (typesData) => {
        typesState.setData(typesData);
      }
    );
  }, [typesState]);

  const addTask = async (task: ITask): Promise<void> => {
    await handleAsyncAction(
      async () => {
        const res = await TasksService.addTask(task);
        if (!res.data) throw new Error(res.message);
      },
      tasksState.setIsLoading,
      tasksState.setError,
      async () => {
        await refreshTasks();
        await refreshTypes();
      }
    );
  };

  const addType = async (type: IType): Promise<void> => {
    await handleAsyncAction(
      async () => {
        const res = await TypeServices.addType(type);
        if (res.statusCode !== 200) throw new Error(res.message);
      },
      typesState.setIsLoading,
      typesState.setError,
      async () => {
        await refreshTasks();
        await refreshTypes();
      }
    );
  };

  const updateTask = async (task: ITask): Promise<void> => {
    await handleAsyncAction(
      async () => {
        const res = await TasksService.updateTask(task);
        if (!res.data) throw new Error(res.message);
      },
      tasksState.setIsLoading,
      tasksState.setError,
      async () => {
        await refreshTasks();
        await refreshTypes();
      }
    );
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    await handleAsyncAction(
      async () => {
        const res = await TasksService.deleteTask(taskId);
        if (!res.data) throw new Error(res.message);
      },
      tasksState.setIsLoading,
      tasksState.setError,
      async () => {
        await refreshTasks();
        await refreshTypes();
      }
    );
  };

  const changeFilter = (filter: TaskFilterType): void => {
    setActiveFilter(filter);
    setFilteredTasks(filterTasks(tasksState.data, filter));
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (!initialTasks) refreshTasks();
      if (!initialTypes) refreshTypes();
    }
  }, [initialTasks, initialTypes, refreshTasks, refreshTypes]);

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
    deleteTask,
    addType,
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
