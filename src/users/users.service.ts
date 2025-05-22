import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { userSelector } from './selector/user.selector';
import { SearchState } from 'generated/prisma';
import { userSchema } from './entities/user.entity';
import { UpdateUser } from './entities/update-user.entity';
import { CreateUser } from './entities/create-user.entity';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) { }

  async create(createUserDto: CreateUser) {
    const data = {
      ...createUserDto,
      opennedEmail: 0,
      searchState: SearchState.SEARCHING,
    }
    const user = await this.prismaService.user.create({
      data: data, select: userSelector,
    })
    return userSchema.parse(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { email: email },
      select: userSelector,
    })
    return userSchema.parse(user);
  }
  async findOne(id: string) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { id: id },
      select: userSelector,
    })
    return userSchema.parse(user);
  }

  async update(id: string, updateUser: UpdateUser) {
    const user = await this.prismaService.user.update({
      where: { id: id },
      data: updateUser,
      select: userSelector,
    });
    return userSchema.parse(user);
  }

  async remove(id: string) {
    const user = await this.prismaService.user.delete({
      where: { id: id },
      select: userSelector,
    })
    return userSchema.parse(user);
  }
}
