import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto, credentialsDtoSchema } from './dto/credentials.dto';
import { userDtoSchema } from 'src/users/dto/user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { userJwtDtoSchema } from './dto/user-jwt.dto';
import { updateUserSchema } from 'src/users/entities/update-user.entity';
import { OtpDto } from './dto/otp.dto';
import { otpSchema } from './entities/otp.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('sign-in')
  async signIn(@Body() credentialsDto: CredentialsDto) {
    const credentials = credentialsDtoSchema.parse(credentialsDto);
    return this.authService.signIn(credentials).then((user) => userJwtDtoSchema.parse(user));
  }

  @Public()
  @Post('pre-register')
  async preRegister(@Body() credentialsDto: CredentialsDto) {
    const credentials = credentialsDtoSchema.parse(credentialsDto);
    return this.authService.preRegister(credentials).then((user) => userJwtDtoSchema.parse(user));
  }

  @Post('register')
  async register(@CurrentUser('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = updateUserSchema.parse(updateUserDto);
    return this.authService.register(userId, updateUser).then((user) => userDtoSchema.parse(user));
  }

  @Post('check-email')
  async checkEmail(@CurrentUser('id') userId: string, @Body() otpDto: OtpDto) {
    const otp = otpSchema.parse(otpDto);
    return this.authService.checkEmail(userId, otp);
  }

  @Get('me')
  async findMe(@CurrentUser('id') userId: string) {
    return this.authService.findMe(userId).then((user) => userDtoSchema.parse(user));
  }
}
