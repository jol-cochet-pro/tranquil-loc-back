import { createWarrantorSchema } from './create-warrantor.entity';
import { z } from 'zod';

export const updateWarrantorSchema = createWarrantorSchema.partial()

export type UpdateWarrantor = z.infer<typeof updateWarrantorSchema>;
