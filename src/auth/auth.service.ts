import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private UserService: UsersService){}
    async login(username:string, password:string) : Promise<any> {
        const user = await this.UserService.getUserByUsername(username);
        const isMatch = bcrypt.compare(password,user.password);
        return true;
    }
}
