import { Injectable } from '@nestjs/common';
import { CreateOccupantDto } from './dto/create-occupant.dto';
import { UpdateOccupantDto } from './dto/update-occupant.dto';
import { occupantSelector } from './selector/occupants.selector';
import { OccupantDto } from './dto/occupant.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OccupantsService {
    constructor(private prismaService: PrismaService) { }

    async create(createOccupantDto: CreateOccupantDto) {
        const newOccupant = await this.prismaService.occupant.create({
            data: createOccupantDto, select: occupantSelector
        });
        return new OccupantDto(newOccupant);
    }

    async findAll() {
        const occupants = await this.prismaService.occupant.findMany({
            select: occupantSelector,
        })
        return occupants.map(occupant => new OccupantDto(occupant));
    }

    async findOne(id: string) {
        const occupant = await this.prismaService.occupant.findUniqueOrThrow({
            where: { id: id },
            select: occupantSelector,
        })
        return new OccupantDto(occupant);
    }


    async update(id: string, updateOccupantDto: UpdateOccupantDto) {
        const occupant = await this.prismaService.occupant.update({
            where: { id: id },
            data: updateOccupantDto,
            select: occupantSelector,
        })
        return new OccupantDto(occupant);

    }

    async remove(id: string) {
        const occupant = await this.prismaService.occupant.delete({
            where: { id: id },
            select: occupantSelector,
        })
        return new OccupantDto(occupant);
    }
}
