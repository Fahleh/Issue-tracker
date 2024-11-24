import { Status } from '@prisma/client';
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(3).max(15),
    email: z.string().email(),
    password: z.string().min(5),
    confirmPassword: z.string().min(5).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const issueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(4),
});

export const patchIssueSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(4).max(65535).optional(),
  status: z.nativeEnum(Status).optional(),
  assignedToUserId: z.string().min(1).max(255).optional().nullable(),
});
