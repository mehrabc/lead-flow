import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"), // ✅ Fix here
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  country: z.string().min(1, "Please select a country"),
  city: z.string().min(1, "City is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  course: z.enum(["IELTS Preparation", "Spoken English"], {
    required_error: "Please select a course",
  }),
  purpose: z.enum(
    [
      "IELTS Exam Preparation",
      "Improving English Speaking",
      "Improving English Writing & Reading",
    ],
    {
      required_error: "Please select your purpose",
    }
  ),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});
