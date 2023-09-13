import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Get } from '@nestjs/common'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
    @Get()
    @UseGuards(JwtAuthGuard) // Protected Route
    dashboard(): string {
        return 'Welcome to Dashboard!'
    }
}
