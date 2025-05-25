import { DocumentType } from "generated/prisma";
import { z } from "zod";


export const createDocumentSchema = z.object({
    type: z.nativeEnum(DocumentType),
    content: z.string().base64(),
    extension: z.string(),
    mimeType: z.string(),
})

export type CreateDocument = z.infer<typeof createDocumentSchema>;