import { userSchema } from "./user.entity";



export const userContactSchema = userSchema.pick({
    id: true,
    email: true,
    firstname: true,
    lastname: true,
    phone: true,
})