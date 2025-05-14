import { generateSelector } from "src/common/utils";
import { occupantSchema } from "../entities/occupant.entity";

export const occupantSelector = generateSelector(occupantSchema);