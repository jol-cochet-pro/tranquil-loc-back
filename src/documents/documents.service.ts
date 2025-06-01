import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDocument } from './entities/create-document.entity';
import { PrismaService } from 'src/prisma.service';
import { FilesService } from 'src/common/files/files.service';
import { documentSchema } from './entities/document.entity';
import { ResourceType } from './entities/resource-type.entity';
import { documentSelector } from './selector/document.selector';
import { documentUrlSchema } from './entities/document-url.entity';
import { randomUUID } from 'crypto';
import { documentContentSchema } from './entities/document-content.entity';
import { b64toBlob } from 'src/common/utils';


@Injectable()
export class DocumentsService {
  constructor(private prismaService: PrismaService, private filesService: FilesService) { }

  async create(userId: string, resourceId: string, createDocument: CreateDocument, resourcetype: ResourceType) {

    const documentId = randomUUID();

    const key = `${userId}/${resourceId}/${createDocument.type}/${documentId}.${createDocument.extension}`;

    const data = {
      id: documentId,
      type: createDocument.type,
      key: key,
      ...(resourcetype === "occupant"
        ? { occupantId: resourceId }
        : { warrantorId: resourceId }),
    }

    const document = await this.prismaService.document.create({
      data: data,
      select: documentSelector,
    });

    try {
      await this.filesService.store(
        key,
        Buffer.from(createDocument.content, "base64"),
        createDocument.mimeType
      );
    } catch {
      await this.remove(documentId);
      throw new InternalServerErrorException();
    }

    return documentSchema.parse(document);
  }

  async createZip(userId: string) {
    const key = `${userId}/folder.zip`;
    try {
      const documents = await this.prismaService.document.findMany({
        where: { OR: [{ occupant: { userId: userId } }, { warrantor: { userId: userId } }] },
        select: documentSelector,
      });
      const files = await Promise.all(documents.map(async (document) => {
        const content = await this.filesService.retrieveContent(document.key);
        return {
          name: document.type + document.key.substring(document.key.lastIndexOf(".")),
          content: b64toBlob(content.data, content.type),
        }
      }));
      return this.filesService.zip(key, files);
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string, info: "url" | "content") {
    const document = await this.prismaService.document.findUniqueOrThrow({
      where: { id: id },
      select: documentSelector,
    });
    if (info == "url") {
      const url = await this.filesService.retrieveUrl(document.key);
      return documentUrlSchema.parse({ ...document, url: url });
    }
    const content = await this.filesService.retrieveContent(document.key);
    return documentContentSchema.parse({ ...document, content: content })
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
