import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'
import { User } from './entities/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
