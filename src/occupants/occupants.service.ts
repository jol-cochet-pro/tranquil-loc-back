import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { occupantSelector } from './selector/occupants.selector';
import { PrismaService } from '../prisma.service';
import { occupantSchema } from './entities/occupant.entity';
import { CreateOccupant } from './entities/create-occupant.entity';
import { UpdateOccupant } from './entities/update-occupant.entity';
import { DocumentsService } from 'src/documents/documents.service';

@Injectable()
export class OccupantsService {
    constructor(private prismaService: PrismaService, private documentsService: DocumentsService) { }

    async create(userId: string, createOccupant: CreateOccupant) {
        const { documents, ...occupant } = createOccupant;
        const data = {
            ...occupant,
            userId: userId,
        }
        const newOccupant = await this.prismaService.occupant.create({
            data: data,
            select: occupantSelector
        });
        try {
            const newDocuments = await Promise.all(documents.map((document) =>
                this.documentsService.create(userId, newOccupant.id, document, "occupant")
            ));
            return occupantSchema.parse({ ...newOccupant, documents: newDocuments });
        } catch {
            await this.remove(userId, newOccupant.id);
            throw new InternalServerErrorException();
        }
    }

    async findAll(userId: string) {
        const occupants = await this.prismaService.occupant.findMany({
            where: { userId: userId },
            select: occupantSelector,
        });
        return occupants.map(occupant => occupantSchema.parse(occupant));
    }

    async findOne(userId: string, id: string) {
        const occupant = await this.prismaService.occupant.findUniqueOrThrow({
            where: { userId: userId, id: id },
            select: occupantSelector,
        })
        return occupantSchema.parse(occupant);
    }


    async update(userId: string, id: string, updateOccupant: UpdateOccupant) {
        const { documents, removedDocumentsId, ...data } = updateOccupant;
        try {
            // Create / Update all documents
            await Promise.all(documents?.map((document) =>
                this.documentsService.create(userId, id, document, "occupant")) ?? []
            );

            // Delete old documents
            await Promise.all(removedDocumentsId?.map((documentId) =>
                this.documentsService.remove(documentId)) ?? []
            );

            const newOccupant = await this.prismaService.occupant.update({
                where: { userId: userId, id: id },
                data: data,
                select: occupantSelector,
            })
            return occupantSchema.parse(newOccupant);
        } catch (error) {
            throw new InternalServerErrorException();
        }

    }

    async remove(userId: string, id: string) {
        const occupant = await this.prismaService.occupant.delete({
            where: { userId: userId, id: id },
            select: occupantSelector,
        });
        return occupantSchema.parse(occupant);
    }
}
