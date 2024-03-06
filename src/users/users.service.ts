import { Injectable } from '@nestjs/common';
import { User } from '../model/users.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UsersService {
    constructor (@InjectModel(User.name) private userModel : Model<User>){}
    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    async getUserById(id:string): Promise<User>{
        return this.userModel.findById(id);
    }
    async getUserByUsername(username:string): Promise<User>{
        return this.userModel.findOne({username:username}).exec();;
    }
    async creatUser(user: User): Promise<boolean>{
        try{
            let findUser = await this.userModel.findOne({username : user.username});
            if(!findUser){
                await this.userModel.create(user);
                return true;
            }else{
                return false;
            }
        }catch(error){
            throw error;
        }
        
    }
    async updateUser(user: User,id:string): Promise<boolean>{
        try {
            let findUser = await this.userModel.findById(id);
            if(findUser){
                if(user.username == findUser.username){
                    await this.userModel.findByIdAndUpdate(id,user);
                    return true;
                }else{
                    return false;
                }
                
            }else{
                return false;
            }
        } catch (error) {
            throw error;
        }
    }
    async deleteUser(id: string): Promise<boolean>{
        try{
            let findUser = await this.userModel.findById(id);
            if(findUser){
                await this.userModel.findByIdAndDelete(id);
                return true;
            }else{
                return false;
            }
        }catch(error){
            throw error;
        }
    }
}
