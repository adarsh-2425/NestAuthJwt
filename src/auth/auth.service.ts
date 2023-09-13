import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from './interfaces/login.interface';
import { Register } from './interfaces/register.interface';
import { User } from 'src/users/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common/exceptions';

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
    async login(loginUser: Login): Promise<{token: string, user: any}> {
        const user = await this.userModel.findOne({email: loginUser.email});
        
        if (!user) {
            throw new UnauthorizedException('User does not exist');
        }

        const isPasswordvalid = await this.decryptPassword(loginUser.password, user.password);
        if (!isPasswordvalid) {
            throw new UnauthorizedException('Password is wrong');
        }

        // Generate JWT token
        const token = jwt.sign({sub: user._id, username: user.name}, 'secret', {
            expiresIn: '5h',
        })

        return {token, user: {id: user.id, name: user.name}}
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

    // Validate User By Idy

    async validateUserById(id: string): Promise<User | null> {
        try {
            const user = await this.userModel.findById(id);
            return user || null;
        } catch (error) {
            console.error(error.message);
            return null;
        }
    }
}
