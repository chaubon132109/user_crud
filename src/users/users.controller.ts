import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../model/users.model';
import { log } from 'console';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly UserService: UsersService){}
    @Get()
    async getAllUser(): Promise<User[]>{
        return this.UserService.getAllUsers();
    }
    @Get(':id')
    // @UseGuards(AuthGuard)
    async getUserById(@Param('id') id : string){
        return this.UserService.getUserById(id);
    }
    @Post()
    async createUser(@Body() userDto : User): Promise<Boolean>{
        return this.UserService.creatUser(userDto);
    }
    @Patch(':id')
    async updateUser(@Param('id') id:string ,@Body() userDto : User): Promise<Boolean>{
        return this.UserService.updateUser(userDto,id);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id:string): Promise<Boolean>{
        return this.UserService.deleteUser(id);
    }
}
