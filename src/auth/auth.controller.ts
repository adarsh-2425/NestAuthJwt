import { Controller } from '@nestjs/common';
import { Register } from './interfaces/register.interface';
import { Login } from './interfaces/login.interface';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register') // Route for registration, e.g., POST /auth/register
    register(@Body() registerDto: RegisterDto): Promise<Register> {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<{token: string, user: any}> {
        return this.authService.login(loginDto)
    }
}
