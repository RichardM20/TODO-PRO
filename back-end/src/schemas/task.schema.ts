import { z } from "zod";

import dateSchema from "./date.schema";

export const taskSchema = z.object({
  id: z.string().uuid().optional(),
  content: z.string().nonempty("Content is required"),
  type: z.object({
    name: z.string().nonempty("Type name is required"),
  }),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
});
