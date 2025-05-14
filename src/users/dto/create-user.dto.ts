import { SearchState, UserType } from "generated/prisma";
import { z } from "zod";
import { createUserSchema } from "../entities/create-user.entity";


export const createUserDtoSchema = createUserSchema.omit({ emailVerified: true, infosFilled: true });

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;