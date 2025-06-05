import { createOccupantSchema } from './create-occupant.entity';
import { z } from 'zod';

export const updateOccupantSchema = createOccupantSchema.extend({
    removedDocumentIds: z.array(z.string().uuid())
}).partial()

export type UpdateOccupant = z.infer<typeof updateOccupantSchema>;
