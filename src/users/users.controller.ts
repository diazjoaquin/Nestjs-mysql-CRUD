import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.usersService.deleteUser(id)
  }
  
  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: CreateUserDto) {
    return this.usersService.updateUser(id, user);
  }
}
