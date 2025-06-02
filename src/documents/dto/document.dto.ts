import { documentSchema } from "../entities/document.entity";

export const documentDtoSchema = documentSchema.omit({ key: true });