"use client";

import { Check } from "lucide-react";

import { ITask } from "@dashboard/types/task.type";
import { getCardColor } from "@dashboard/utils/colors";
import ErrorContainer from "@shared/components/ErrorContainer";

import AddTaskCard from "../cards/AddTaskCard";
import TaskCard from "../cards/TaskCard";

interface TaskGridProps {
  tasks: ITask[];
  isLoading: boolean;
  isSaving: boolean;
  isDeleting: boolean;
  error: string | undefined;
  deleteMode: boolean;
  selectedTasksForDelete: Set<string>;
  onTaskClick: (task: ITask) => void;
  onAddTaskClick: () => void;
}

const TaskGrid = ({
  tasks,
  isLoading,
  isSaving,
  isDeleting,
  error,
  deleteMode,
  selectedTasksForDelete,
  onTaskClick,
  onAddTaskClick,
}: TaskGridProps) => {
  const renderSkeletons = () => {
    return Array.from({ length: 4 }, (_, index) => (
      <div
        key={`skeleton-${index}`}
        className="animate-pulse bg-gray-200 rounded-lg h-[300px]"
      />
    ));
  };

  const renderTasks = () => {
    return [
      !deleteMode && (
        <div key="add-task" className="h-[300px]">
          <AddTaskCard onClick={onAddTaskClick} />
        </div>
      ),
      ...tasks.map((task, index) => {
        const isSelected = selectedTasksForDelete.has(task.id!);
        return (
          <div key={task.id || index} className="relative h-[300px]">
            <TaskCard
              task={task}
              backgroundColor={getCardColor(index)}
              fixedHeight={true}
              onClick={() => onTaskClick(task)}
            />
            {deleteMode && (
              <div
                className={`absolute inset-0 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-red-500 bg-red-100 bg-opacity-30"
                    : "border-transparent hover:border-red-300"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onTaskClick(task);
                }}
              >
                <div className="absolute top-2 right-2">
                  <div
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                      isSelected
                        ? "bg-red-500 border-red-500"
                        : "border-gray-400 bg-white"
                    } flex items-center justify-center pointer-events-none`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      }),
    ].filter(Boolean);
  };

  if (isLoading || isSaving || isDeleting) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderSkeletons()}
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="col-span-full">
          <ErrorContainer error={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {renderTasks()}
    </div>
  );
};

export default TaskGrid;