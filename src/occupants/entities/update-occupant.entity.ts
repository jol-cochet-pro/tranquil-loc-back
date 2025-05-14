import { createOccupantSchema } from './create-occupant.entity';
import { z } from 'zod';

export const updateOccupantSchema = createOccupantSchema.partial()

export type UpdateOccupant = z.infer<typeof updateOccupantSchema>;
