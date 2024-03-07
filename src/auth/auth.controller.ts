import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() body: any, @Res() res: Response) {
        const {username, password} = body;
        const token = await this.authService.login(username, password);
        if(token){
            await this.authService.signCookie(res,token);
            return res.status(HttpStatus.OK).json({
                message: 'Login successful',
                token: token
            }); 
        }else{
            return res.status(HttpStatus.UNAUTHORIZED).json({
                message: 'Invalid credentials'
            });
        }
    }
}   
