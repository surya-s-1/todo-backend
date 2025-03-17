import { Body, Controller, Post } from '@nestjs/common'
import { TodoService } from './todo.service'
import { UserDto } from './dto/user.dto'

@Controller('todo')
export class TodoController {
    constructor (private readonly todoService: TodoService) {}

    @Post('user/create')
    createUser(@Body() createUserDto: UserDto) {
        return this.todoService.createUser(createUserDto.username, createUserDto.password)
    }
}
