import { z } from "zod";

export const fileSchema = z.object({
    Data: z.string().base64(),
    Filename: z.string().nonempty(),
    ContentType: z.string().nonempty(),
    Url: z.string().url(),
})