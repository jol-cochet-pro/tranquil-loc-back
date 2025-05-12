import { generateSelector } from "src/common/utils";
import { Occupant } from "../entities/occupant.entity";

export const occupantSelector = generateSelector(Occupant);