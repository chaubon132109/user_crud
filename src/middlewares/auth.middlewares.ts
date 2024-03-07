import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: any, res: any, next: () => void) {

      try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = this.jwtService.verify(token);
        req.user = decoded; 
      } catch (error) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

  }
}
