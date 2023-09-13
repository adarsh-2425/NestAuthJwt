import { Controller, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { Get, Put, Delete, Body, Param } from '@nestjs/common'

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<User> {
        return this.userService.findOne(id);
    }


    @Put(':id')
    update(@Body() userDto: UserDto, @Param('id') id): Promise<User> {
        return this.userService.update(id, userDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<User> {
        return this.userService.delete(id);
    }

    // @Get()
    // @UseGuards(JwtAuthGuard)
    // dashboard(): String {
    //     return 'Welcome to Dashboard'
    // }
    
}
