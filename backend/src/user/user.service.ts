import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  // ----------------------------------------------------
  // Create user function
  // ----------------------------------------------------
  async create(createUserDto: UserDTO): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  // ----------------------------------------------------
  // Find all users function
  // ----------------------------------------------------
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // ----------------------------------------------------
  // Find user function
  // ----------------------------------------------------
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  // ----------------------------------------------------
  // Find user by email function
  // ----------------------------------------------------
  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  // ----------------------------------------------------
  // Delete user function
  // ----------------------------------------------------
  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
