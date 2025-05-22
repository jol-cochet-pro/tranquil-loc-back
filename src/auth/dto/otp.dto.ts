import { z } from "zod";
import { otpSchema } from "../entities/otp.entity";

export const otpDtoSchema = otpSchema;

export type OtpDto = z.infer<typeof otpDtoSchema>;
