import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { ConfigService } from '@nestjs/config';
// import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    // private readonly usersService: UsersService,
  ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['jwt'];
        log(token);
        if (!token) {
          return false; 
        }
        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded; 
            return true; 
          } catch (error) {
            throw error;
            return false;
        }
    }
}
