import { z } from "zod";
import { userJwtSchema } from "../entities/user-jwt.entity";

export const userJwtDtoSchema = userJwtSchema;

export type UserJwtDto = z.infer<typeof userJwtDtoSchema>;