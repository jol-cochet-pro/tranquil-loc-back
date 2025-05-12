import { generateSelector } from "src/common/utils";
import { User } from "../entities/user.entity";

export const userSelector = generateSelector(User);