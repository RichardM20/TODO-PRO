import { createContext, ReactNode, useContext, useState } from "react";

import { DrawerContextType } from "@dashboard/types/drawer.type";

const DashboardContext = createContext<DrawerContextType | undefined>(
  undefined
);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <DashboardContext.Provider
      value={{
        isDrawerOpen,
        toggleDrawer,
        closeDrawer,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DashboardProvider");
  }
  return context;
};
