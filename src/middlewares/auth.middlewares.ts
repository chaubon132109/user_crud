import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {} 
    use(req: any, res: any, next: (error?: any) => void) {
        const { username, password } = req.body;  
        
        const payload = {username: username};
        
        next();
    }
}