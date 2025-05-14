import { z } from 'zod';
import { createOccupantSchema } from '../entities/create-occupant.entity';

export const createOccupantDtoSchema = createOccupantSchema;

export type CreateOccupantDto = z.infer<typeof createOccupantDtoSchema>;