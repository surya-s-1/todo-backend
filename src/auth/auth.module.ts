import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { TodoController as AuthController } from './auth.controller'
import { TodoService as AuthService } from './auth.service'
import { User } from './entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.JWT_SECRET })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
