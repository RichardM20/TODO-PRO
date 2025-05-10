"use client";

import { useTaskContext } from "@dashboard/context/tasksContetext";

export const useTaskData = () => {
  const {
    tasks,
    isLoadingTasks,
    taskError,
    refreshTasks,
    addTask
  } = useTaskContext();

  return {
    tasks,
    isLoading: isLoadingTasks,
    error: taskError,
    refreshTasks,
    addTask
  };
};
