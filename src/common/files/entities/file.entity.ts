import { z } from "zod";

export const fileSchema = z.object({
    data: z.string().base64(),
    name: z.string().nonempty(),
    contentType: z.string().nonempty(),
    url: z.string().url(),
})