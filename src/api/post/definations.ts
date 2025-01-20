import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(1),
  thumbnail: z.string(),
  metaTitle: z.string().optional(),
  metaDecription: z.string().optional(),
  categoryId: z.number().optional(),
});

export const UpdatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(3),
  content: z.string().min(1),
  thumbnail: z.string(),
  metaTitle: z.string().optional(),
  metaDecription: z.string().optional(),
  categoryId: z.number().optional(),
});

export type FormState =
  | {
      errors?: {
        title?: string[];
        content?: string[];
        thumbnail?: string[];
        metaTitle?: string[];
        metaDecription?: string[];
      };
      message?: string;
    }
  | undefined;
