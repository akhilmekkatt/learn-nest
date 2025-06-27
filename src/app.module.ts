import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', // Replace with your MySQL password
      database: 'test',
      entities: [User],
      synchronize: true, // Set to false in production
      autoLoadEntities: true, // Ensures entities are loaded automatically
    }),
    UsersModule,
  ],
})
export class AppModule {}
