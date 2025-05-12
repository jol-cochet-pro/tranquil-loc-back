import { SearchState, User, UserType } from "generated/prisma";

export class UserDto {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    opennedEmail: number;
    phone: string;
    searchState: SearchState;
    type: UserType;

    constructor(object: User) {
        const { password, ...result } = object;
        Object.assign(this, result);
    }
}
