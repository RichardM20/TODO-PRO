"use client";

import { useMemo, useState } from "react";

import { useTaskContext } from "../context/tasksContetext";
import { ITask, TaskListFilterType } from "../types/task.type";

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
    deleteTask,
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
    deleteTask,
  };
};

export const useTaskFilters = (tasks: ITask[] | undefined) => {
  const [activeFilter, setActiveFilter] =
    useState<TaskListFilterType>("date-desc");

  const filteredAndSortedTasks = useMemo(() => {
    if (!tasks) return [];

    let filtered = [...tasks];

    switch (activeFilter) {
      case "date-asc":
        filtered = filtered.sort(
          (a, b) =>
            new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        );
        break;
      case "date-desc":
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [tasks, activeFilter]);

  return {
    activeFilter,
    setActiveFilter,
    filteredAndSortedTasks,
  };
};

export const useDeleteMode = () => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedTasksForDelete, setSelectedTasksForDelete] = useState<
    Set<string>
  >(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  const handleTaskSelection = (taskId: string) => {
    const newSelection = new Set(selectedTasksForDelete);
    if (newSelection.has(taskId)) {
      newSelection.delete(taskId);
    } else {
      newSelection.add(taskId);
    }
    setSelectedTasksForDelete(newSelection);
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setSelectedTasksForDelete(new Set());
  };

  const resetDeleteMode = () => {
    setDeleteMode(false);
    setSelectedTasksForDelete(new Set());
  };

  return {
    deleteMode,
    selectedTasksForDelete,
    isDeleting,
    setIsDeleting,
    handleTaskSelection,
    toggleDeleteMode,
    resetDeleteMode,
  };
};