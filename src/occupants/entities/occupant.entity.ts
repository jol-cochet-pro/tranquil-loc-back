import { ProSituation, HomeSituation } from 'generated/prisma';
import { z } from 'zod';

export const occupantSchema = z.object({
    id: z.string().uuid(),
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    email: z.string().email().nonempty(),
    homeSituation: z.nativeEnum(HomeSituation),
    proSituation: z.nativeEnum(ProSituation),
    income: z.number().nonnegative(),
    dateOfBirth: z.date(),
    phone: z.string(),
    userId: z.string(),
});