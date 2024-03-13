import { TaskListModule } from '../tasks/taskList/taskList.module';
import { AuthModule } from './../auth/auth.module';
import { UserModule } from './../user/user.module';
import { DbModule } from './../../db/db.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { PassportMiddleware } from 'src/ passport.middleware';
import { TaskItemModule } from '../tasks/taskItem/taskItem.module';

@Module({
  imports: [
    TaskListModule,
    TaskItemModule,
    TokenModule,
    AuthModule,
    UserModule,
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PassportMiddleware).forRoutes('*');
  }
}
