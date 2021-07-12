// define req schema validations
import { z } from "zod";

// Request schemas
export const addTodo = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

export const userSignin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type userSigninType = z.infer<typeof userSignin>;

export const userSignup = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().nonempty({ message: "Name is missing" }),
  surname: z.string().nonempty({ message: "Surname is missing" }),
});

export type userSignupType = z.infer<typeof userSignup>;

export const todoAdd = z.object({
  todo: z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
  }),
});

export type todoAddType = z.infer<typeof todoAdd>;

export const todoUpdate = z.object({
  todo: z.object({
    _id: z.string(),
    title: z.string().optional(),
    done: z.boolean().optional(),
    description: z.string().optional(),
    owner: z.string(),
  }),
});

export type todoUpdatType = z.infer<typeof todoUpdate>;

export const todoDelete = z.object({
  todo: z.object({
    _id: z.string().nonempty(),
    owner: z.string().nonempty(),
  }),
});

export type todoDeleteType = z.infer<typeof todoDelete>;
