import { Injectable } from '@nestjs/common';
import { occupantSelector } from './selector/occupants.selector';
import { PrismaService } from '../prisma.service';
import { occupantSchema } from './entities/occupant.entity';
import { CreateOccupant } from './entities/create-occupant.entity';
import { UpdateOccupant } from './entities/update-occupant.entity';

@Injectable()
export class OccupantsService {
    constructor(private prismaService: PrismaService) { }

    async create(userId: string, createOccupant: CreateOccupant) {
        const data = {
            ...createOccupant,
            userId: userId,
        }
        const newOccupant = await this.prismaService.occupant.create({
            data: data, select: occupantSelector
        });
        return occupantSchema.parse(newOccupant);
    }

    async findAll(userId: string) {
        const occupants = await this.prismaService.occupant.findMany({
            where: { userId: userId },
            select: occupantSelector,
        })
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
        const occupant = await this.prismaService.occupant.update({
            where: { userId: userId, id: id },
            data: updateOccupant,
            select: occupantSelector,
        })
        return occupantSchema.parse(occupant);

    }

    async remove(userId: string, id: string) {
        const occupant = await this.prismaService.occupant.delete({
            where: { userId: userId, id: id },
            select: occupantSelector,
        })
        return occupantSchema.parse(occupant);
    }
}
