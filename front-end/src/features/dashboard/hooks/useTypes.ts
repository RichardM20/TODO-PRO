"use client";

import { useTaskContext } from "../context/tasksContetext";


export const useTypeData = () => {
  const { types, isLoadingTypes, typeError, refreshTypes, addType } =
    useTaskContext();

  return {
    types,
    isLoading: isLoadingTypes,
    error: typeError,
    refreshTypes,
    addType,
  };
};