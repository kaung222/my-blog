import { z } from "zod";

export type FormState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;

export const CreateCategorySchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().optional(),
});

export const UpdateCategorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required."),
  description: z.string().optional(),
});
