import { SearchState, UserType } from "generated/prisma";

export class UserDto {
    email: string;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    opennedEmail: number;
    phone: string;
    searchState: SearchState;
    type: UserType;

    constructor(object: any) {
        Object.assign(object, this);
    }
}
