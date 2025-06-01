import { DocumentType } from 'generated/prisma';
import { z } from "zod"


export const documentSchema = z.object({
    id: z.string().uuid(),
    key: z.string().nonempty(),
    type: z.nativeEnum(DocumentType),
    name: z.string().nonempty(),
    url: z.string().url(),
});

export type Document = z.infer<typeof documentSchema>;
