import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save({ ...createUserDto });
  }

  findAll(sortBy: 'firstName' | 'lastName' | 'position' | 'phone' | 'email', sortType: 'ASC' | 'DESC'): Promise<User[]> {
    let order = {}
    if (sortBy==='firstName') order = { firstName: sortType };
    else if (sortBy==='lastName') order = { lastName: sortType };
    else if (sortBy==='position') order = { position: sortType };
    else if (sortBy==='phone') order = { phone: sortType };
    else if (sortBy==='email') order = { email: sortType };
    return this.userRepository.find({
      order
    });
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDto });
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }
}
