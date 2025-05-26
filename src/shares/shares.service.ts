import { Injectable } from '@nestjs/common';
import { CreateShare } from './entities/create-share.entity';
import { UpdateShare } from './entities/update-share.entity';
import { PrismaService } from 'src/prisma.service';
import { shareSelector } from './selector/share.selector';
import { shareSchema } from './entities/share.entity';
import { MailService } from 'src/common/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { OccupantsService } from 'src/occupants/occupants.service';
import { WarrantorsService } from 'src/warrantors/warrantors.service';
import { Attachment } from 'src/common/mail/entity/attachment.entity';
import { DocumentsService } from 'src/documents/documents.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SharesService {
  constructor(
    private prismaService: PrismaService,
    private mailService: MailService,
    private usersService: UsersService,
    private occupantsService: OccupantsService,
    private warrantorsService: WarrantorsService,
    private documentsService: DocumentsService,
    private jwtService: JwtService,
  ) { }

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

    const occupants = await this.occupantsService.findAll(userId);
    const warrantors = await this.warrantorsService.findAll(userId);

    const documents = await Promise.all([
      ...occupants.flatMap((occupant) => occupant.documents),
      ...warrantors.flatMap((warrantor) => warrantor.documents)
    ].map((document) => this.documentsService.findOne(document.id, "content")));

    const attachments: Attachment[] = documents.map((document, i) => ({
      Base64Content: document["content"].data,
      ContentType: document["content"].type,
      Filename: `coucou${i}${document.key.substring(document.key.lastIndexOf("."))}`,
    }));

    const token = this.jwtService.sign({ id: share.id }, {
      expiresIn: '1h',
      secret: process.env.SHARE_JWT_SECRET,
    });

    try {
      await this.mailService.sendEmail(share.email, "share_folder", {
        firstname: user.firstname,
        lastname: user.lastname,
        link: `http://localhost:8080/#/shared-folder?token=${token}`,
      }, attachments);
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

  async findOne(id: string, userId?: string) {
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
