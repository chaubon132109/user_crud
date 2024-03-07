import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
@Injectable()

        
export class AuthService {
    constructor(private readonly userService : UsersService, private readonly jwtSerVice : JwtService, private readonly configService: ConfigService){}
    async login(username:string, password:string) : Promise<any> {
        try {
            const user = await this.userService.getUserByUsername(username);
            if(user){
                const isMatch = await bcrypt.compare(password,user.password);
                if(isMatch){
                    const payload = {username: username, id: user._id};     
                    return this.jwtSerVice.sign(payload);
                }else{
                    return null;
                }
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
        
    }
    async signCookie(res: Response, token: string) {
        const expirationDate = new Date(Date.now() + this.configService.get('JWT_COOKIE_EXPIRES_IN') * 1000);
        log(expirationDate);
        res.cookie('jwt', token, {
          expires: expirationDate,
          httpOnly: true,
          secure: this.configService.get('NODE_ENV') === 'production'
        });
 
      }
}