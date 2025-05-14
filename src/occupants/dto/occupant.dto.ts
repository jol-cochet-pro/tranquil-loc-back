import { occupantSchema } from '../entities/occupant.entity';

export const occupantDtoSchema = occupantSchema.omit({ userId: true });

