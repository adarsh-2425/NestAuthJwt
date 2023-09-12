import { Controller } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { UserDto } from 'src/dto/user.dto';
import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register') // Route for registration, e.g., POST /auth/register
    register(@Body() userDto: UserDto): Promise<User> {
        return this.authService.register(userDto);
    }
}
