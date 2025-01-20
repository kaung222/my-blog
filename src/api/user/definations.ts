import { z } from "zod";

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email format."),
  password: z.string(),
});
