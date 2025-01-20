import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(1),
});
