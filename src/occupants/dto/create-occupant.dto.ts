import { z } from 'zod';
import { createOccupantSchema } from '../entities/create-occupant.entity';
import { createDocumentDtoSchema } from 'src/documents/dto/create-document.dto';

export const createOccupantDtoSchema = createOccupantSchema.extend({
    dateOfBirth: z.string().datetime({ local: true }),
    documents: z.array(createDocumentDtoSchema)
});

export type CreateOccupantDto = z.infer<typeof createOccupantDtoSchema>;