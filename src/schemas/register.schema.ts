// frontend/src/schemas/register.schema.ts
import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required"),
  image: z.string().url("Invalid image URL").optional().or(z.literal('')),
  role: z.enum(['user', 'admin']).optional().default('user'),
});

export default registerValidationSchema;