import z from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  password: z.string().min(6, "Passoword must be 6 characters long"),
  phone: z
    .string()
    .min(1, "Phone no is required")
    .regex(/^\d{10}$/, "Invalid phone no"),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  gender: z.enum(["m", "f", "o"]),
  address: z.string().min(1, "Address is required"),
});

export type registerDataType = z.infer<typeof registerSchema>;

export const createUserSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email(),
  phone: z
    .string()
    .min(1, "Phone no is required")
    .regex(/^\d{10}$/, "Invalid phone no"),
  dob: z
    .string()
    .min(1, "Date is required")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
  gender: z.enum(["m", "f", "o"]),
  address: z.string().min(1, "Address is required"),
});

export type CreateUserDataType = z.infer<typeof createUserSchema>;

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone: string;
  dob: Date;
  address: string;
  created_at?: Date;
}
