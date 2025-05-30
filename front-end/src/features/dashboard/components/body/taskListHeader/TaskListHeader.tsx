"use client";

import { Check, Filter, Trash2, X } from "lucide-react";
import { useState } from "react";

import { TaskListFilterType } from "@dashboard/types/task.type";
import { ITaskListHeaderProps } from "@dashboard/types/taskList.type";
import { filterDataListOptions } from "@dashboard/utils/filter";

import ActionButton from "./ActionButton";

const TaskListHeader = (props: ITaskListHeaderProps) => {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <h1 className="text-2xl font-bold">TODO PRO</h1>

      <div className="flex items-center gap-3 mt-4 sm:mt-0">
        <div className="relative">
          <ActionButton
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            icon={Filter}
            variant="default"
          >
            {
              filterDataListOptions.find(
                (opt) => opt.value === props.activeFilter
              )?.label
            }
          </ActionButton>

          {showFilterMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px]">
              {filterDataListOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    props.setActiveFilter(option.value as TaskListFilterType);
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg cursor-pointer ${
                    props.activeFilter === option.value
                      ? "bg-blue-50 text-blue-600"
                      : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {!props.deleteMode ? (
          <ActionButton
            onClick={props.onToggleDeleteMode}
            icon={Trash2}
            variant="danger"
          >
            Delete
          </ActionButton>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {props.selectedTasksCount} selected
            </span>
            <ActionButton
              onClick={props.onConfirmDelete}
              icon={Check}
              variant="success"
              disabled={props.selectedTasksCount === 0 || props.isDeleting}
            >
              Confirm
            </ActionButton>
            <ActionButton
              onClick={props.onToggleDeleteMode}
              icon={X}
              variant="default"
            >
              Cancel
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskListHeader;
