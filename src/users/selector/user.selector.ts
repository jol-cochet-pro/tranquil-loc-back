import { generateSelector } from "src/common/utils";
import { userSchema } from "../entities/user.entity";

export const userSelector = generateSelector(userSchema);