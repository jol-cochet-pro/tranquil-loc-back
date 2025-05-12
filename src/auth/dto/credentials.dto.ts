import { z } from "zod"

export const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20)
    .refine((password) => /[A-Z]/.test(password))
    .refine((password) => /[a-z]/.test(password))
    .refine((password) => /[0-9]/.test(password))
    .refine((password) => /[;!@#$%^&*]/.test(password)),
})

export type CredentialsDto = z.infer<typeof credentialsSchema>; 