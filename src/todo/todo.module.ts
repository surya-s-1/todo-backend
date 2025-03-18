import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]),
    AuthModule
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
