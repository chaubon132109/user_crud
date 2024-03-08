import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './middlewares/auth.middlewares';
import { APP_GUARD, REQUEST } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule, ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'daf49sj3k6af94cka64jllsjf846kjc96',
      signOptions: { expiresIn: '3600s' },
    })
  ],
  controllers: [AppController],
  providers: [AppService,
      // {
      //   provide: APP_GUARD,
      //   useClass: AuthGuard,
      // }
  ],
})
export class AppModule {}
// export class AppModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes({path:'/users/:id',method: RequestMethod.GET});
//   }
// }

