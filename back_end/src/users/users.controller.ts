import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query('sortBy') sortBy: 'firstName' | 'lastName' | 'position' | 'phone' | 'email',
    @Query('sortType') sortType: 'ASC' | 'DESC'
  ) {
    if (!(sortBy && sortType)) {
      sortBy = 'firstName';
      sortType = 'ASC';
    }
    const users = await this.usersService.findAll(sortBy, sortType);
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id)
    if (!user) throw new NotFoundException();
    else return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException();
    else await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException();
    else await this.usersService.remove(id);
  }
}
