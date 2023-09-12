import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOne(id: String): Promise<User> {
    return await this.userModel.findById(id);
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async update(id: String, user: User): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true })
  }

  async delete(id: String): Promise<User> {
    return this.userModel.findByIdAndDelete(id)
  }
}
