import { z } from "zod";
import { userSchema } from "../entities/user.entity";

export const userDtoSchema = userSchema.omit({ password: true, emailVerified: true, infosFilled: true });

export type UserDto = z.infer<typeof userDtoSchema>;