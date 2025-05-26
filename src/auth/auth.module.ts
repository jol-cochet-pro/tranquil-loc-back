import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/common/mail/mail.module';

@Module({
  imports: [
    MailModule, 
    UsersModule, 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
