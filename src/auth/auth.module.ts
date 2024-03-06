import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from 'src/model/users.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports : [UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
