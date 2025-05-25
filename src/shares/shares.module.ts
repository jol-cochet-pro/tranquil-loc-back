import { Module } from '@nestjs/common';
import { SharesService } from './shares.service';
import { SharesController } from './shares.controller';
import { PrismaService } from 'src/prisma.service';
import { MailModule } from 'src/common/mail/mail.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [MailModule, UsersService],
  controllers: [SharesController],
  providers: [SharesService, PrismaService],
})
export class SharesModule { }
