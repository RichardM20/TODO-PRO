"use client";

import { useDashboardContext } from "../context/drawerContext";

import TaskListData from "./TasksList";


const DashboardClient = () => {
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

export default DashboardClient;
