import { SearchState, UserType } from "generated/prisma";

export class User {
    id: string; 
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    opennedEmail: number;
    phone: string;
    searchState: SearchState;
    type: UserType;

    constructor(object: any) {
        Object.assign(this, object);
    }
}