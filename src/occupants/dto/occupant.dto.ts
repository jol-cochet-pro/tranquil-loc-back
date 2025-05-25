import { z } from 'zod';
import { occupantSchema } from '../entities/occupant.entity';
import { documentDtoSchema } from 'src/documents/dto/document.dto';

export const occupantDtoSchema = occupantSchema.omit({ userId: true }).extend({
    documents: z.array(documentDtoSchema),
});

