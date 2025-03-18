import { Body, Controller, Post } from '@nestjs/common'
import { TodoService } from './auth.service'
import { UserDto } from './dto/user.dto'

@Controller('auth')
export class TodoController {
    constructor (private readonly todoService: TodoService) {}

    @Post('user/create')
    createUser(@Body() createUserDto: UserDto) {
        return this.todoService.createUser(createUserDto.username, createUserDto.password)
    }

    @Post('user/login')
    loginUser(@Body() loginUserDto: UserDto) {
        return this.todoService.loginUser(loginUserDto.username, loginUserDto.password)
    }
}
