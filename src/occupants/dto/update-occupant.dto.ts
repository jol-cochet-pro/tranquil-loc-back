import { z } from 'zod';
import { updateOccupantSchema } from '../entities/update-occupant.entity';

export const updateOccupantDtoSchema = updateOccupantSchema;

export type UpdateOccupantDto = z.infer<typeof updateOccupantDtoSchema>;
