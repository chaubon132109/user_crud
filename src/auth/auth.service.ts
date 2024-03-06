import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel : Model<User>){}
    async login(username:string, password:string) : Promise<any> {
        const user = await this.userModel.findOne({username: username});
        if(user){
            const isMatch = await bcrypt.compare(password,user.password);
            if(isMatch){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}
        
