import { z } from "zod";
import { createUserSchema } from "../entities/create-user.entity";


export const createUserDtoSchema = createUserSchema
    .omit({ emailVerified: true, infosFilled: true })
    .extend({
        dateOfBirth: z.string().datetime({ local: true })
    })

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;