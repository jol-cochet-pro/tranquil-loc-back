import { Module } from '@nestjs/common';
import { SharesService } from './shares.service';
import { SharesController } from './shares.controller';
import { PrismaService } from 'src/prisma.service';
import { MailModule } from 'src/common/mail/mail.module';
import { OccupantsModule } from 'src/occupants/occupants.module';
import { UsersModule } from 'src/users/users.module';
import { WarrantorsModule } from 'src/warrantors/warrantors.module';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/common/files/files.module';

@Module({
  imports: [
    MailModule,
    UsersModule,
    OccupantsModule,
    WarrantorsModule,
    FilesModule,
    JwtModule.register({
      global: true,
      secret: process.env.SHARED_JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [SharesController],
  providers: [SharesService, PrismaService],
  exports: [SharesService]
})
export class SharesModule { }
