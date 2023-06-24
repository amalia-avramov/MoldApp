import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from '../dtos/user.dto';
import { User } from '../schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ----------------------------------------------------
  // GET all users endpoint
  // ----------------------------------------------------
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // ----------------------------------------------------
  // GET user by ID endpoint
  // ----------------------------------------------------
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  // ----------------------------------------------------
  // GET user by email endpoint
  // ----------------------------------------------------
  @Get(':email')
  async findUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findUserByEmail(email);
  }

  // ----------------------------------------------------
  // PUT user endpoint
  // ----------------------------------------------------
  @Post()
  async create(@Body() createdDto: UserDTO) {
    await this.userService.create(createdDto);
  }

  // ----------------------------------------------------
  // DELETE user endpoint
  // ----------------------------------------------------
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
