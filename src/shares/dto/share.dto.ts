import { z } from "zod";
import { shareSchema } from "../entities/share.entity";

export const shareDtoSchema = shareSchema.omit({
    userId: true
});

export type ShareDto = z.infer<typeof shareDtoSchema>;