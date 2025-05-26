import { userContactDtoSchema } from "src/users/dto/user-contact.dto";
import { sharedInfosSchema } from "../entities/shared-infos.entity";
import { occupantDtoSchema } from "src/occupants/dto/occupant.dto";
import { warrantorDtoSchema } from "src/warrantors/dto/warrantor.dto";
import { z } from "zod";

export const sharedInfosDtoSchema = sharedInfosSchema.extend({
    user: userContactDtoSchema,
    occupants: z.array(occupantDtoSchema),
    warrantors: z.array(warrantorDtoSchema),
});