"use client";

import { useTaskContext } from "@dashboard/context/tasksContetext";

export const useTypeData = () => {
  const {
    types,
    isLoadingTypes,
    typeError,
    refreshTypes
  } = useTaskContext();

  return {
    types,
    isLoading: isLoadingTypes,
    error: typeError,
    refreshTypes
  };
};