import { PickType } from "@nestjs/mapped-types";
import { UserDto } from "src/users/dto/user.dto";
import { UserJwt } from "../entities/user-jwt.entity";

export class UserJwtDto extends PickType(UserDto, ["id", "email"]) {
    accessToken: string;

    constructor(object: UserJwt) {
        super({});
        this.id = object.id;
        this.email = object.email;
        this.accessToken = object.accessToken;
    }
}