import { z } from "zod";

export const apiExceptionSchema = z.object({
    code: z.string(),
})

export type ApiException = z.infer<typeof apiExceptionSchema>;