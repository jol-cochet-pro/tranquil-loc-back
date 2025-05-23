import { z } from 'zod';
import { createWarrantorSchema } from '../entities/create-warrantor.entity';

export const createWarrantorDtoSchema = createWarrantorSchema.extend({
    dateOfBirth: z.string().datetime({ local: true })
});

export type CreateWarrantorDto = z.infer<typeof createWarrantorDtoSchema>;