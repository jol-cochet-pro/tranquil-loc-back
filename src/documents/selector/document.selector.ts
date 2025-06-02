import { generateSelector } from "src/common/utils";
import { documentSchema } from "../entities/document.entity";

export const documentSelector = generateSelector(documentSchema);