import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    async register(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        // Hash the password
        newUser.password = await this.hashPassword(newUser.password);
        return await newUser.save();
      }
    
    // Function to Hash Password using bcryptjs
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds)
    }
}
