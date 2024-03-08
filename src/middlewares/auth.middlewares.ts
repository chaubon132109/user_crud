import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: any, res: any, next: () => void) {
    try {
      const token = req.cookies['jwt'];
      if (!token) {
        throw new UnauthorizedException('Unauthorized');
      }
      const decoded = this.jwtService.verify(token);
      req.user = decoded; 
      next(); 
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
