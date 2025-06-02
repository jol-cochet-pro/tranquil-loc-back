import { z } from "zod";
import { documentSchema } from "./document.entity";

export const documentUrlSchema = documentSchema.extend({
    url: z.string().url()
})