import { z } from "zod";

export const otpSchema = z.object({
    code: z.preprocess(Number, z.number().min(10000).max(99999)),
})

export type Otp = z.infer<typeof otpSchema>;