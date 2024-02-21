import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseFactory } from './config/database/database.factory';
import DatabaseConfiguration from './config/database/database';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfiguration],
    }),
    AuthModule,
    CoreModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: DatabaseFactory,
    }),
  ],
})
export class AppModule {}
