import { z } from "zod";
import { documentSchema } from "./document.entity";

export const documentContentSchema = documentSchema.extend({
    content: z.object({
        data: z.string().base64(),
        type: z.string().nonempty(),
    })
})