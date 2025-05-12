import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOccupantDto } from './dto/create-occupant.dto';
import { UpdateOccupantDto } from './dto/update-occupant.dto';
import { occupantSelector } from './selector/occupants.selector';
import { Occupant } from './entities/occupant.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OccupantsService {
    constructor(private prismaService: PrismaService) { }

    async create(userId: string, createOccupantDto: CreateOccupantDto) {
        const data = {
            ...createOccupantDto,
            userId: userId,
        }
        const newOccupant = await this.prismaService.occupant.create({
            data: data, select: occupantSelector
        });
        return new Occupant(newOccupant);
    }

    async findAll(userId: string) {
        const occupants = await this.prismaService.occupant.findMany({
            where: { userId: userId },
            select: occupantSelector,
        })
        return occupants.map(occupant => new Occupant(occupant));
    }

    async findOne(userId: string, id: string) {
        const occupant = await this.prismaService.occupant.findUniqueOrThrow({
            where: { userId: userId, id: id },
            select: occupantSelector,
        })
        return new Occupant(occupant);
    }


    async update(userId: string, id: string, updateOccupantDto: UpdateOccupantDto) {
        const occupant = await this.prismaService.occupant.update({
            where: { userId: userId, id: id },
            data: updateOccupantDto,
            select: occupantSelector,
        })
        return new Occupant(occupant);

    }

    async remove(userId: string, id: string) {
        const occupant = await this.prismaService.occupant.delete({
            where: { userId: userId, id: id },
            select: occupantSelector,
        })
        return new Occupant(occupant);
    }
}
