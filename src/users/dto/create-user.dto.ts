import { SearchState, UserType } from "generated/prisma";
import { z } from "zod";


export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty(),
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    dateOfBirth: z.string().datetime(),
    phone: z.string().nonempty(),
    type: z.nativeEnum(UserType),
})

export type CreateUserDto = z.infer<typeof createUserSchema>;