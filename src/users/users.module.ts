import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import {User, UserSchema} from '../model/users.model'
import { JwtService } from '@nestjs/jwt';
@Global()
@Module({
  imports : [MongooseModule.forFeature([{name: User.name, schema: UserSchema }])],
  controllers: [
    UsersController,
  ],
  providers: [UsersService, JwtService]
})
export class UsersModule {}
