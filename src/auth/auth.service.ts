import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from './interfaces/login.interface';
import { Register } from './interfaces/register.interface';
import * as bcrypt from 'bcryptjs';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<Register>){}

    // Register
    async register(user: Register): Promise<Register> {
        const newUser = new this.userModel(user);
        // Hash the password
        newUser.password = await this.hashPassword(newUser.password);
        return await newUser.save();
      }
    
    // Login
    async login(user: Login): Promise<String> {
        const isUser = await this.userModel.findOne({email: user.email});
        
        if (!isUser) {
            throw new NotFoundException('User does not exist');
        }

        const isPasswordvalid = await this.decryptPassword(user.password, isUser.password);
        if (!isPasswordvalid) {
            throw new NotFoundException('Password is wrong');
        }

        return 'Login Success'
    }
    
    // Function to Hash Password using bcryptjs
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds)
    }

    // Function to Decrypt Password using bcryptjs
    private async decryptPassword(password: string, userPassword: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.compare(password, userPassword)
    }
}
