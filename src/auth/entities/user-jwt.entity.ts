import { userSchema } from "src/users/entities/user.entity";
import { z } from "zod";

export const userJwtSchema = userSchema.pick({ 
        id: true, 
        email: true, 
        emailVerified: true, 
        infosFilled: true 
    })
    .merge(z.object({ accessToken: z.string().nonempty(), }));