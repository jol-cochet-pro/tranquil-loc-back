import { updateShareSchema } from '../entities/update-share.entity';
import { z } from 'zod';

export const updateShareDtoSchema = updateShareSchema;

export type UpdateShareDto = z.infer<typeof updateShareDtoSchema>;