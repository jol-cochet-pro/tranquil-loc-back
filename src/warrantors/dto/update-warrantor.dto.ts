import { z } from 'zod';
import { updateWarrantorSchema } from '../entities/update-warrantor.entity';

export const updateWarrantorDtoSchema = updateWarrantorSchema;

export type UpdateWarrantorDto = z.infer<typeof updateWarrantorDtoSchema>;
