import { SearchState, UserType } from "generated/prisma";
import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
    otp: z.string().nullable(),
    firstname: z.string(),
    lastname: z.string(),
    dateOfBirth: z.date(),
    opennedEmail: z.number(),
    phone: z.string(),
    type: z.nativeEnum(UserType),
    searchState: z.nativeEnum(SearchState),
    emailVerified: z.boolean(),
    infosFilled: z.boolean(),

})

export type User = z.infer<typeof userSchema>;
