"use client";

import Drawer from "@dashboard/components/drawer/Drawer";
import {
  DashboardProvider,
  useDashboardContext,
} from "@features/dashboard/context/drawerContext";
import DrawerToggleIcon from "../../features/dashboard/components/drawer/components/DrawerIcon";
import { TaskProvider } from "../../features/dashboard/context/tasksContetext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TaskProvider>
      <DashboardProvider>
        <LayoutContent>{children}</LayoutContent>
      </DashboardProvider>
    </TaskProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isDrawerOpen, toggleDrawer, closeDrawer } = useDashboardContext();

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="md:hidden p-4">
        {!isDrawerOpen && <DrawerToggleIcon onClick={toggleDrawer} />}
      </div>

      <div
        className={`fixed inset-0 z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75"
          onClick={closeDrawer}
        />
        <div className="relative flex flex-col w-80 max-w-[80%] h-full bg-white">
          <Drawer />
        </div>
      </div>

      <div className="hidden md:block md:w-64 lg:w-72 flex-shrink-0">
        <Drawer className="h-screen" />
      </div>

      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
