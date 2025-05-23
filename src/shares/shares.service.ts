import { Injectable } from '@nestjs/common';
import { CreateShare } from './entities/create-share.entity';
import { UpdateShare } from './entities/update-share.entity';
import { PrismaService } from 'src/prisma.service';
import { shareSelector } from './selector/share.selector';
import { shareSchema } from './entities/share.entity';
import { MailService } from 'src/common/mail/mail.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SharesService {
  constructor(private prismaService: PrismaService, private mailService: MailService, private usersService: UsersService) { }

  async create(userId: string, createShare: CreateShare) {
    const user = await this.usersService.findOne(userId);
    const data = {
      ...createShare,
      userId: userId
    }
    const share = await this.prismaService.share.create({
      data: data,
      select: shareSelector,
    })
    const link = "http://localhost:3000/test";
    const documents_list = []
    try {
      await this.mailService.sendEmail(share.email, "share_folder", {
        firstname: user.firstname,
        lastname: user.lastname,
        link: link,
      })
    } catch (_) {
      await this.remove(userId, share.id)
    }
    return shareSchema.parse(share);
  }

  async findAll(userId: string) {
    const shares = await this.prismaService.share.findMany({
      where: { userId: userId },
      select: shareSelector,
    });
    return shares.map((share) => shareSchema.parse(share));
  }

  async findOne(userId: string, id: string) {
    const share = await this.prismaService.share.findUniqueOrThrow({
      where: { id: id, userId: userId },
      select: shareSelector,
    });
    return shareSchema.parse(share);
  }

  async update(userId: string, id: string, updateShare: UpdateShare) {
    const share = await this.prismaService.share.update({
      where: { id: id, userId: userId },
      data: updateShare,
      select: shareSelector,
    });
    return shareSchema.parse(share);
  }

  async remove(userId: string, id: string) {
    const share = await this.prismaService.share.delete({
      where: { id: id, userId: userId },
      select: shareSelector,
    });
    return shareSchema.parse(share);
  }
}
