"use client";

import TaskListData from "@dashboard/components/TasksList";
import { useDashboardContext } from "../../features/dashboard/context/drawerContext";

const DashboardPage = () => {
  const { indexView } = useDashboardContext();

  const renderSection = () => {
    switch (indexView) {
      case 0:
        return <TaskListData />;
      default:
        return <TaskListData />;
    }
  };

  return <div className="dashboard-page">{renderSection()}</div>;
};

export default DashboardPage;
