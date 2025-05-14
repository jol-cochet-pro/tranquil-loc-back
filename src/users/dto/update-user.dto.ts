import { updateUserSchema } from '../entities/update-user.entity';
import { z } from 'zod';

export const updateUserDtoSchema = updateUserSchema;

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
