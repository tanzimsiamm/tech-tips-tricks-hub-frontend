// frontend/src/schemas/login.schema.ts
import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required"), // Min 1 character as per backend
});

export default loginValidationSchema;