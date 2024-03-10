import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskItem } from 'src/models/taskItem.entity';
import { TaskList } from 'src/models/taskList.entity';
import { User } from 'src/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db_host'),
        port: +configService.get('db_port'),
        username: configService.get('db_username'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        entities: [User, TaskList, TaskItem],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DbModule {}
