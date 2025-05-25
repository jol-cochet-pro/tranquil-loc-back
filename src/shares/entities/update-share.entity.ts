import { z } from "zod";
import { createShareSchema } from "./create-share.entity";

export const updateShareSchema = createShareSchema.partial();

export type UpdateShare = z.infer<typeof updateShareSchema>