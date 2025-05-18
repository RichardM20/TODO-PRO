"use client";

import { useState } from "react";

import { IType } from "@dashboard/types/type.type";

import { IGenericDropdown } from "../types/genericDropDown.type";

const GenericDropdown = ({
  types,
  onSelect,
  placeholder = "Select a type",
  defaultValue = null,
}: IGenericDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<IType | null>(defaultValue);

  const handleSelect = (tag: IType) => {
    setSelectedTag(tag);
    onSelect(tag);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-44">
      <button
        type="button"
        className="w-full bg-gray-100 border border-gray-100 rounded-xl px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedTag ? selectedTag.name : placeholder}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {types.map((tag) => (
            <li
              key={tag.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(tag)}
            >
              {tag.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenericDropdown;
