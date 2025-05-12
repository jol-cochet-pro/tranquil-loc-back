import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserJwt } from './entities/user-jwt.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(credentials: CredentialsDto) {
        try {
            const user = await this.usersService.findOneByEmail(credentials.email);
            if (!compareSync(credentials.password, user.password))
                throw new UnauthorizedException();
            const payload = { id: user.id, email: user.email };
            const accessToken = await this.jwtService.signAsync(payload);
            return new UserJwt({ ...payload, accessToken: accessToken });
        } catch (err) {
            console.error(err);
            throw new UnauthorizedException();
        }
    }

    async register(createUserDto: CreateUserDto) {
        const salt = genSaltSync();
        const password = hashSync(createUserDto.password, salt);
        const createUser = {
            ...createUserDto,
            password: password,
        }
        return this.usersService.create(createUser);
    }
}