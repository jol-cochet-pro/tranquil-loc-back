import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUser } from 'src/users/entities/update-user.entity';
import { createUserSchema } from 'src/users/entities/create-user.entity';
import { userJwtSchema } from './entities/user-jwt.entity';
import { MailService } from 'src/common/mail/mail.service';
import { randomInt } from 'node:crypto';
import { Otp } from './entities/otp.entity';
import { userJwtDtoSchema } from './dto/user-jwt.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private mailService: MailService) { }

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
            dateOfBirth: date.toISOString(),
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
        const otpNumber = 10000 + randomInt(89999);
        const salt = genSaltSync();
        const otp = hashSync(otpNumber.toString(), salt);
        const data = {
            ...updateUser,
            infosFilled: true,
            otp: otp,
        }
        const updatedUser = await this.usersService.update(userId, data);
        try {
            await this.mailService.sendEmail(updatedUser.email, "email_verification", { firstname: updatedUser.firstname, otp: otpNumber.toString() })
        } catch {
            return this.usersService.remove(updatedUser.id);
        }
        return updatedUser;
    }

    async checkEmail(userId: string, otp: Otp) {
        const user = await this.usersService.findOne(userId);
        if (user.emailVerified)
            throw new ForbiddenException();
        if (!user.otp)
            throw new NotFoundException();
        if (!compareSync(otp.code.toString(), user.otp))
            throw new BadRequestException();
        await this.usersService.update(userId, { emailVerified: true });
    }

    async findMe(userId: string) {
        return this.usersService.findOne(userId);
    }
}