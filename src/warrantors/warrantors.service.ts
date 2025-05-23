import { Injectable } from '@nestjs/common';
import { warrantorSelector } from './selector/warrantors.selector';
import { PrismaService } from '../prisma.service';
import { warrantorSchema } from './entities/warrantor.entity';
import { CreateWarrantor } from './entities/create-warrantor.entity';
import { UpdateWarrantor } from './entities/update-warrantor.entity';

@Injectable()
export class WarrantorsService {
    constructor(private prismaService: PrismaService) { }

    async create(userId: string, createWarrantor: CreateWarrantor) {
        const data = {
            ...createWarrantor,
            userId: userId,
        }
        const newWarrantor = await this.prismaService.warrantor.create({
            data: data, select: warrantorSelector
        });
        return warrantorSchema.parse(newWarrantor);
    }

    async findAll(userId: string) {
        const warrantors = await this.prismaService.warrantor.findMany({
            where: { userId: userId },
            select: warrantorSelector,
        })
        return warrantors.map(warrantor => warrantorSchema.parse(warrantor));
    }

    async findOne(userId: string, id: string) {
        const warrantor = await this.prismaService.warrantor.findUniqueOrThrow({
            where: { userId: userId, id: id },
            select: warrantorSelector,
        })
        return warrantorSchema.parse(warrantor);
    }


    async update(userId: string, id: string, updateWarrantor: UpdateWarrantor) {
        const warrantor = await this.prismaService.warrantor.update({
            where: { userId: userId, id: id },
            data: updateWarrantor,
            select: warrantorSelector,
        })
        return warrantorSchema.parse(warrantor);

    }

    async remove(userId: string, id: string) {
        const warrantor = await this.prismaService.warrantor.delete({
            where: { userId: userId, id: id },
            select: warrantorSelector,
        })
        return warrantorSchema.parse(warrantor);
    }
}
