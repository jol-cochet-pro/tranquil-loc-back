import { z } from "zod";

export const attachmentSchema = z.object({
    ContentType: z.string().nonempty(),
    Filename: z.string().nonempty(),
    Base64Content: z.string().base64()
})

export type Attachment = z.infer<typeof attachmentSchema>;