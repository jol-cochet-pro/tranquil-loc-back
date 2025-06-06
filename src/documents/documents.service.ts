import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDocument } from './entities/create-document.entity';
import { PrismaService } from 'src/prisma.service';
import { FilesService } from 'src/common/files/files.service';
import { documentSchema } from './entities/document.entity';
import { ResourceType } from './entities/resource-type.entity';
import { documentSelector } from './selector/document.selector';
import { b64toBlob } from 'src/common/utils';
import { documentUrlSchema } from './entities/document-url.entity';


@Injectable()
export class DocumentsService {
  constructor(private prismaService: PrismaService, private filesService: FilesService) { }

  async create(userId: string, resourceId: string, createDocument: CreateDocument, resourcetype: ResourceType) {
    const key = `${userId}/${resourceId}/${createDocument.type}/${createDocument.name}`;
    const data = {
      ...createDocument,
      key: key,
      ...(resourcetype === "occupant"
        ? { occupantId: resourceId }
        : { warrantorId: resourceId }),
    }
    const document = await this.prismaService.document.create({
      data: data,
      select: documentSelector,
    });
    return documentSchema.parse(document);
  }

  async createFile(userId: string, id: string, file: Express.Multer.File) {
    const document = await this.findOne(userId, id, false);
    try {
      await this.filesService.store(document.key, file.buffer, file.mimetype)
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findOneZip(userId: string) {
    const key = `${userId}/folder.zip`;
    try {
      const documents = await this.prismaService.document.findMany({
        where: { OR: [{ occupant: { userId: userId } }, { warrantor: { userId: userId } }] },
        select: documentSelector,
      });
      const files = await Promise.all(documents.map(async (document) => {
        const content = await this.filesService.retrieve(document.key);
        return {
          name: document.type + document.key.substring(document.key.lastIndexOf(".")),
          content: b64toBlob(content.Data, content.ContentType),
        }
      }));
      return this.filesService.zip(key, files);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findOne(userId: string, id: string, hasUrl: boolean) {
    const document = await this.prismaService.document.findUniqueOrThrow({
      where: { id: id, OR: [{ occupant: { userId: userId } }, { warrantor: { userId: userId } }] },
      select: documentSelector,
    });
    if (hasUrl) {
      const file = await this.filesService.retrieve(document.key);
      return documentUrlSchema.parse({ ...document, url: file.Url });
    }
    return documentSchema.parse(document);
  }

  async remove(id: string) {
    const document = await this.prismaService.document.delete({
      where: { id: id },
      select: documentSelector,
    });
    await this.filesService.delete(document.key);
    return documentSchema.parse(document);
  }
}
