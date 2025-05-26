import { documentDtoSchema } from 'src/documents/dto/document.dto';
import { warrantorSchema } from '../entities/warrantor.entity';
import { z } from 'zod';

export const warrantorDtoSchema = warrantorSchema.omit({ userId: true }).extend({
    documents: z.array(documentDtoSchema),
});

