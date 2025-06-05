import { HomeSituation, ProSituation } from 'generated/prisma';
import { createDocumentSchema } from 'src/documents/entities/create-document.entity';
import { z } from 'zod';

export const createOccupantSchema = z.object({
    firstname: z.string().nonempty(),
    lastname: z.string().nonempty(),
    email: z.string().email().nonempty(),
    homeSituation: z.nativeEnum(HomeSituation),
    proSituation: z.nativeEnum(ProSituation),
    income: z.number().nonnegative(),
    dateOfBirth: z.string().datetime({ local: true }).transform((arg) => new Date(arg)),
    phone: z.string(),
    documents: z.array(createDocumentSchema)
})

export type CreateOccupant = z.infer<typeof createOccupantSchema>;