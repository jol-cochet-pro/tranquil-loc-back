import { DocumentType } from 'generated/prisma';
import { z } from "zod"


export const documentSchema = z.object({
    id: z.string().uuid(),
    type: z.nativeEnum(DocumentType),
    key: z.string(),
});

export type Document = z.infer<typeof documentSchema>;
