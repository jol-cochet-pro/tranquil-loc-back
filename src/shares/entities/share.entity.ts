import { ShareDurationPeriod, SharePermission } from "generated/prisma";
import { z } from "zod";


export const shareSchema = z.object({
    id: z.string().uuid(),
    description: z.string().nonempty(),
    email: z.string().email(),
    durationNum: z.number().nonnegative(),
    durationPeriod: z.nativeEnum(ShareDurationPeriod),
    occupantPermission: z.nativeEnum(SharePermission),
    warrantorPermission: z.nativeEnum(SharePermission),
    userId: z.string().uuid(),
})
