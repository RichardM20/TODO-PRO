"use client";

import { useState } from "react";

import { useTaskData } from "@dashboard/hooks/useTask";
import { getCardColor } from "@features/dashboard/utils/colors";
import ErrorContainer from "@shared/components/ErrorContainer";

import { useTypeData } from "../hooks/useTypes";
import { ITask } from "../types/task.type";
import { IType } from "../types/type.type";

import AddTaskCard from "./cards/AddTaskCard";
import TaskCard from "./cards/TaskCard";
import TaskContentEdition from "./edition/TaskEdition";

const TaskListData = () => {
  const { tasks, error, isLoading, addTask, updateTask } = useTaskData();
  const { types } = useTypeData();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [taskSelected, setSelectedTask] = useState<ITask | undefined>(
    undefined
  );

  const handleModalState = (val: boolean) => {
    setOpenModal(val);
    if (!val) setSelectedTask(undefined);
  };

  const handleOnTapTask = (task: ITask) => {
    setSelectedTask(task);
    handleModalState(true);
  };

  const handleOnSaveTask = async (content: string, type: IType) => {
    if (!taskSelected) {
      await addTask({
        content,
        type: type,
      });
      setSelectedTask(undefined);
      handleModalState(false);
    } else {
      await updateTask({
        ...taskSelected,
        content: content,
        type: type,
      });
      setSelectedTask(undefined);
      handleModalState(false);
    }
  };

  const renderTasks = () => {
    if (isLoading) {
      return Array.from({ length: 4 }, (_, index) => (
        <div
          key={`skeleton-${index}`}
          className="animate-pulse bg-gray-200 rounded-lg h-[300px]"
        />
      ));
    }

    if (error) {
      return (
        <div className="col-span-full">
          <ErrorContainer error={error} />
        </div>
      );
    }

    return [
      <div key="add-task" className="h-[300px]">
        <AddTaskCard onClick={() => handleModalState(true)} />
      </div>,
      ...(tasks ?? []).map((task, index) => (
        <TaskCard
          key={task.id || index}
          task={task}
          backgroundColor={getCardColor(index)}
          fixedHeight={true}
          onClick={() => handleOnTapTask(task)}
        />
      )),
    ];
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold">TODO PRO</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {renderTasks()}
      </div>

      <TaskContentEdition
        isModalVisible={openModal}
        setIsModalVisible={handleModalState}
        task={taskSelected}
        types={types}
        isLoading={isLoading}
        onSave={handleOnSaveTask}
        onCancel={() => handleModalState(false)}
      />
    </div>
  );
};

export default TaskListData;
