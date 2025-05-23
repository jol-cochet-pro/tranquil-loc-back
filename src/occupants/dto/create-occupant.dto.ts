import { z } from 'zod';
import { createOccupantSchema } from '../entities/create-occupant.entity';

export const createOccupantDtoSchema = createOccupantSchema.extend({
    dateOfBirth: z.string().datetime({ local: true })
});

export type CreateOccupantDto = z.infer<typeof createOccupantDtoSchema>;