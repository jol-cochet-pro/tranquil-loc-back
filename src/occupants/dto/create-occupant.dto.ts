import { HomeSituation, ProSituation } from 'generated/prisma';
import { z } from 'zod';

export const createOccupantSchema = z.object({
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    email: z.string().email().nonempty(),
    homeSituation: z.nativeEnum(HomeSituation),
    proSituation: z.nativeEnum(ProSituation),
    income: z.number().nonnegative(),
    phone: z.string()
})

export type CreateOccupantDto = z.infer<typeof createOccupantSchema>;