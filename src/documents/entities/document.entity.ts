import { DocumentType } from 'generated/prisma';
import { z } from "zod"


export const documentSchema = z.object({
    id: z.string().uuid(),
    key: z.string().nonempty(),
    name: z.string().nonempty(),
    type: z.nativeEnum(DocumentType),
});

export type Document = z.infer<typeof documentSchema>;
