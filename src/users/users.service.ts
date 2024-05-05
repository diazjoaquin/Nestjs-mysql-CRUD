import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  
  createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    this.userRepository.save(newUser);
  }
}
