import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { UserJwtDto } from './dto/user-jwt.dto';
import { CreateUserDto, createUserSchema } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public()
  @Post('login')
  async signIn(@Body() credentials: CredentialsDto) {
    return this.authService.signIn(credentials).then((user) => new UserJwtDto(user));
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const createUser = createUserSchema.parse(createUserDto);
    return this.authService.register(createUser).then((user) => new UserDto(user));
  }

  @Get('me')
  async findMe(@CurrentUser() user) {
    return user;
  }
}
