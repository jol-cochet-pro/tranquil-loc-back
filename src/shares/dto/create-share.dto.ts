import { z } from "zod";
import { createShareSchema } from "../entities/create-share.entity";

export const createShareDtoSchema = createShareSchema;

export type CreateShareDto = z.infer<typeof createShareDtoSchema>;