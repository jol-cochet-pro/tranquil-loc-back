import { OmitType, PickType } from "@nestjs/mapped-types";
import { User } from "src/users/entities/user.entity";

export class UserJwt extends PickType(User, ["email", "id"]) {
    accessToken: string;

    constructor(object: any) {
        super({});
        this.id = object.id;
        this.email = object.email;
        this.accessToken = object.accessToken;
    }
}