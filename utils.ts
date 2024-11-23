import { ZodError, ZodIssue } from 'zod';

export function formatZodErrors(error: ZodError): { path: string; message: string }[] {
  return error.errors.map((err: ZodIssue) => ({
    path: err.path.join('.'),
    message: err.message,
  }));
}