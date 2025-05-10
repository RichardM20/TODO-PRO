"use client";

import { IDrawerTagProps } from "@dashboard-types/drawer.type";

const DrawerTag = ({ label, onClick, isActive = false }: IDrawerTagProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1 mr-2 text-xs rounded-md ${
        isActive
          ? "bg-teal-100 text-teal-800"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
};

export default DrawerTag;
