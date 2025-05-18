import { Calendar, Clock, List } from "lucide-react";

import { TaskFilterType } from "@dashboard/types/task.type";

export const DRAWER_ITEMS = [
  { label: "All", type: "all" as TaskFilterType, icon: <List size={16} /> },
  {
    label: "Today",
    type: "today" as TaskFilterType,
    icon: <Clock size={16} />,
  },
  {
    label: "Week",
    type: "week" as TaskFilterType,
    icon: <Calendar size={16} />,
  },
];
