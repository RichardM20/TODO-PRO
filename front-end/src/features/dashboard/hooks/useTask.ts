"use client";

import { useTaskContext } from "@dashboard/context/tasksContetext";

export const useTaskData = () => {
  const {
    tasks,
    allTasks,
    isLoadingTasks,
    taskError,
    refreshTasks,
    addTask,
    activeFilter,
    changeFilter,
    updateTask,
  } = useTaskContext();

  return {
    tasks,
    allTasks,
    updateTask,
    isLoading: isLoadingTasks,
    error: taskError,
    refreshTasks,
    addTask,
    activeFilter,
    changeFilter,
  };
};