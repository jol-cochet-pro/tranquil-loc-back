import { createOccupantSchema } from './create-occupant.dto';
import { z } from 'zod';

export const updateOccupantSchema = createOccupantSchema.partial()

export type UpdateOccupantDto = z.infer<typeof updateOccupantSchema>;
