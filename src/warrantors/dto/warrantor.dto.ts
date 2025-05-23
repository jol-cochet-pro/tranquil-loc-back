import { warrantorSchema } from '../entities/warrantor.entity';

export const warrantorDtoSchema = warrantorSchema.omit({ userId: true });

