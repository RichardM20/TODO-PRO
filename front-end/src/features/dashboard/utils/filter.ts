import { ITask, TaskFilterType } from "@dashboard/types/task.type";

export const filterTasks = (
  tasks: ITask[] = [],
  filter: TaskFilterType
): ITask[] => {
  switch (filter) {
    case "today":
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return tasks.filter((task) => {
        if (!task.createdAt) return false;

        const taskDate = new Date(task.createdAt);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
      });

    case "week":
      const now = new Date();
      const currentDay = now.getDay();

      const monday = new Date(now);
      monday.setDate(now.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
      monday.setHours(0, 0, 0, 0);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);

      return tasks.filter((task) => {
        if (!task.createdAt) return false;

        const taskDate = new Date(task.createdAt);
        return taskDate >= monday && taskDate <= sunday;
      });

    case "all":
    default:
      return tasks;
  }
};


  export const filterDataListOptions = [
    { value: "date-asc", label: "Oldest first" },
    { value: "date-desc", label: "Newest first" },
  ];
