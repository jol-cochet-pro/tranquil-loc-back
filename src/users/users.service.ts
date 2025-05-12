import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { userSelector } from './selector/user.selector';
import { SearchState } from 'generated/prisma';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      opennedEmail: 0,
      searchState: SearchState.SEARCHING,
    }
    const user = await this.prismaService.user.create({
      data: data, select: userSelector,
    })
    return new UserDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: id },
      data: updateUserDto,
      select: userSelector,
    })
    return new UserDto(user);
  }
}
