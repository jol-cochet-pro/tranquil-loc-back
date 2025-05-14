import { z } from "zod";
import { createUserSchema } from "./create-user.entity";


export const updateUserSchema = createUserSchema.partial();

export type UpdateUser = z.infer<typeof updateUserSchema>;