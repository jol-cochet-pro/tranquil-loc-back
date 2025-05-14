import { Controller, Post, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDtoSchema } from './dto/user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { createUserSchema } from './entities/create-user.entity';
import { updateUserSchema } from './entities/update-user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createUser = createUserSchema.parse(createUserDto);
    return this.usersService.create(createUser).then((user) => userDtoSchema.parse(user));
  }

  @Patch()
  async update(@CurrentUser('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = updateUserSchema.parse(updateUserDto);
    return this.usersService.update(userId, updateUser).then((user) => userDtoSchema.parse(user));
  }
}
