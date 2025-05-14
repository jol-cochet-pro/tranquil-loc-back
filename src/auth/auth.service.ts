import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto, updateUserDtoSchema } from 'src/users/dto/update-user.dto';
import { UpdateUser, updateUserSchema } from 'src/users/entities/update-user.entity';
import { createUserSchema } from 'src/users/entities/create-user.entity';
import { userJwtSchema } from './entities/user-jwt.entity';
import { userDtoSchema } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(credentials: CredentialsDto) {
        try {
            const user = await this.usersService.findOneByEmail(credentials.email);
            if (!compareSync(credentials.password, user.password))
                throw new UnauthorizedException();
            const payload = { id: user.id, email: user.email, emailVerified: user.emailVerified, infosFilled: user.infosFilled };
            const accessToken = this.jwtService.sign(payload);
            return userJwtSchema.parse({ ...payload, accessToken: accessToken });
        } catch (err) {
            throw new UnauthorizedException();
        }
    }

    async preRegister(credentialsDto: CredentialsDto) {
        const salt = genSaltSync();
        const password = hashSync(credentialsDto.password, salt);
        const date = new Date();
        const createUserDto: CreateUserDto = {
            email: credentialsDto.email,
            password: password,
            firstname: '',
            lastname: '',
            dateOfBirth: date ,
            phone: '',
            type: 'OTHER',
        }
        const createUser = createUserSchema.parse(createUserDto);
        await this.usersService.create(createUser); 
        const userJwt = await this.signIn(credentialsDto);
        return userJwtSchema.parse(userJwt);
    }

    async register(userId: string, updateUser: UpdateUser) {
        const user = await this.usersService.findOne(userId);
        if (user.infosFilled) {
            throw new UnauthorizedException();
        }
        const data = {
            ...updateUser,
            infosFilled: true,
        }
        return this.usersService.update(userId, data).then((user) => userDtoSchema.parse(user));
    }
}