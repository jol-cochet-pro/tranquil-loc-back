import { HomeSituation, ProSituation } from 'generated/prisma';
import { z } from 'zod';

export const createOccupantSchema = z.object({
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    email: z.string().email().nonempty(),
    homeSituation: z.nativeEnum(HomeSituation),
    proSituation: z.nativeEnum(ProSituation),
    income: z.number().nonnegative(),
    dateOfBirth: z.string().datetime({ local: true }).transform((arg) => new Date(arg)),
    phone: z.string()
})

export type CreateOccupant = z.infer<typeof createOccupantSchema>;