import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: String): Promise<User> {
    return await this.userModel.findById(id);
  }

  async update(id: String, user: User): Promise<User> {
    if (user.password) {
      user.password = await this.hashPassword(user.password);
    }
    return this.userModel.findByIdAndUpdate(id, user, { new: true })
  }

  async delete(id: String): Promise<User> {
    return this.userModel.findByIdAndDelete(id)
  }

  // Function to Hash Password using bcryptjs
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
  }
}
