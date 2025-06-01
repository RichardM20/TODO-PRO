"use client";

import { useState } from "react";


import Toast from "../../../../shared/components/toast/Toast";
import {
  useDeleteMode,
  useTaskData,
  useTaskFilters,
} from "../../hooks/useTask";
import { useTypeData } from "../../hooks/useTypes";
import { ITask } from "../../types/task.type";
import { IType } from "../../types/type.type";
import TaskContentEdition from "../edition/TaskEdition";

import TaskGrid from "./taskGrid/TaskGrid";
import TaskListHeader from "./taskListHeader/TaskListHeader";

const TaskListData = () => {
  const { tasks, error, isLoading, addTask, updateTask, deleteTask } =
    useTaskData();
  const { types } = useTypeData();

  const [openModal, setOpenModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [taskSelected, setSelectedTask] = useState<ITask | undefined>(
    undefined
  );
  const [isSaving, setIsSaving] = useState(false);

  const { activeFilter, setActiveFilter, filteredAndSortedTasks } =
    useTaskFilters(tasks);
  const {
    deleteMode,
    selectedTasksForDelete,
    isDeleting,
    setIsDeleting,
    handleTaskSelection,
    toggleDeleteMode,
    resetDeleteMode,
  } = useDeleteMode();

  const handleModalState = (val: boolean) => {
    setOpenModal(val);
    if (!val) setSelectedTask(undefined);
  };

  const handleOnTapTask = (task: ITask) => {
    if (deleteMode) {
      handleTaskSelection(task.id!);
      return;
    }
    setSelectedTask(task);
    handleModalState(true);
  };

  const handleConfirmDelete = async () => {
    setToastMessage("");
    if (selectedTasksForDelete.size === 0) return;

    setIsDeleting(true);
    try {
      const deletePromises = Array.from(selectedTasksForDelete).map((taskId) =>
        deleteTask(taskId)
      );
      await Promise.all(deletePromises);
      resetDeleteMode();
    } catch (error) {
      setToastMessage(`${error}`);
      setShowToast(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOnSaveTask = async (content: string, type: IType) => {
    setIsSaving(true);
    setToastMessage("");

    try {
      if (!taskSelected) {
        await addTask({ content, type });
      } else {
        await updateTask({ ...taskSelected, content, type });
      }
      setSelectedTask(undefined);
      handleModalState(false);
    } catch (error) {
      setToastMessage(`${error}`);
      setShowToast(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      <TaskListHeader
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        deleteMode={deleteMode}
        selectedTasksCount={selectedTasksForDelete.size}
        isDeleting={isDeleting}
        onToggleDeleteMode={toggleDeleteMode}
        onConfirmDelete={handleConfirmDelete}
      />

      <TaskGrid
        tasks={filteredAndSortedTasks}
        isLoading={isLoading}
        isSaving={isSaving}
        isDeleting={isDeleting}
        error={error}
        deleteMode={deleteMode}
        selectedTasksForDelete={selectedTasksForDelete}
        onTaskClick={handleOnTapTask}
        onAddTaskClick={() => {
          handleModalState(true)
        }}
      />

      <TaskContentEdition
        isModalVisible={openModal}
        setIsModalVisible={handleModalState}
        task={taskSelected}
        types={types}
        isLoading={isSaving}
        onSave={handleOnSaveTask}
        onCancel={() => handleModalState(false)}
      />
      <Toast
        key={"toast"}
        isVisible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
        type="error"
        title="Ops, something went wrong"
      />
    </div>
  );
};

export default TaskListData;
