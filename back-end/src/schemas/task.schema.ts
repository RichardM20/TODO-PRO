import { z } from "zod";

import { TaskPriority, TaskType } from "@utils/enums";
import dateSchema from "./date.schema";

export const taskSchema = z.object({
  id: z.string().uuid().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "The title cannot exceed 100 characters"),
  description: z
    .string()
    .max(500, "The description cannot exceed 500 characters")
    .optional(),
  type: z.nativeEnum(TaskType, {
    errorMap: () => ({
      message: "The type must be work, personal, study, or other",
    }),
  }),
  tags: z
    .array(z.string())
    .max(5, "You cannot have more than 5 tags")
    .optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
  priority: z.nativeEnum(TaskPriority, {
    errorMap: () => ({
      message: "The priority must be low, medium, high, or urgent",
    }),
  }),
});
