import { UserType } from "generated/prisma"
import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().nonempty(),
    firstname: z.string(),
    lastname: z.string(),
    dateOfBirth: z.string().datetime({ local: true }).transform((arg) => new Date(arg)),
    phone: z.string(),
    type: z.nativeEnum(UserType),
    infosFilled: z.boolean().default(false),
    emailVerified: z.boolean().default(false),
    otp: z.string().nullable().default(null),
})

export type CreateUser = z.infer<typeof createUserSchema>;