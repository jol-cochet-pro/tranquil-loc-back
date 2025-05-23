import { generateSelector } from "src/common/utils";
import { shareSchema } from "../entities/share.entity";

export const shareSelector = generateSelector(shareSchema);