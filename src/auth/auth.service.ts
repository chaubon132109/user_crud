import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
@Injectable()
// export class AuthService {
//     constructor(@InjectModel(User.name) private userModel : Model<User>){}
//     async login(username:string, password:string) : Promise<any> {
//         const user = await this.userModel.findOne({username: username});
//         if(user){
//             const isMatch = await bcrypt.compare(password,user.password);
//             if(isMatch){
//                 return true;
//             }else{
//                 return false;
//             }
//         }else{
//             return false;
//         }
//     }
// }
        
export class AuthService {
    constructor(private readonly userService : UsersService, private readonly jwtSerVice : JwtService){}
    async login(username:string, password:string) : Promise<any> {
        try {
            const user = await this.userService.getUserByUsername(username);
            if(user){
                const isMatch = await bcrypt.compare(password,user.password);
                if(isMatch){
                    const payload = {username: username, id: user._id};     
                    return {token : this.jwtSerVice.sign(payload)};
                }else{
                    return null;
                }
            }else{
                return false;
            }
        } catch (error) {
            throw error;
        }
        
    }
}