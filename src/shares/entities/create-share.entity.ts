import { ShareDurationPeriod, SharePermission } from "generated/prisma";
import { z } from "zod";

export const createShareSchema = z.object({
    description: z.string().nonempty(),
    email: z.string().email(),
    durationNum: z.number().nonnegative(),
    durationPeriod: z.nativeEnum(ShareDurationPeriod),
    occupantPermission: z.nativeEnum(SharePermission),
    warrantorPermission: z.nativeEnum(SharePermission),
})

export type CreateShare = z.infer<typeof createShareSchema>;