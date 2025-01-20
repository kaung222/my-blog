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

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().optional(),
});
