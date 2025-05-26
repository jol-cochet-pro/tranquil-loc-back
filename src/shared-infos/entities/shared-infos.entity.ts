import { occupantSchema } from "src/occupants/entities/occupant.entity";
import { userContactSchema } from "src/users/entities/user-contact.entity";
import { warrantorSchema } from "src/warrantors/entities/warrantor.entity";
import { z } from "zod";


export const sharedInfosSchema = z.object({
    user: userContactSchema,
    occupants: z.array(occupantSchema),
    warrantors: z.array(warrantorSchema),
})
