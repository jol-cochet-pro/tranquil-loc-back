import { generateSelector } from "src/common/utils";
import { warrantorSchema } from "../entities/warrantor.entity";

export const warrantorSelector = generateSelector(warrantorSchema);