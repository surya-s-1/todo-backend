import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDto, DeleteTaskDto, ModifyTaskDto } from './dto/task.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get('list')
    listTasks(@Req() req) {
        return this.todoService.listTasks(req?.user_id)
    }

    @Post('create')
    createTask(@Body() createTaskDto: CreateTaskDto, @Req() req) {
        const { title, description = null, deadline = null } = createTaskDto

        return this.todoService.createTask(req?.user_id, title, description, deadline)
    }

    @Put('modify')
    modifyTask(@Body() modifyTaskDto: ModifyTaskDto) {
        const { task_id, title, description, deadline = null, completed } = modifyTaskDto

        return this.todoService.modifyTask(task_id, title, description, deadline, completed)
    }

    @Delete('delete/:task_id')
    deleteTask(@Param() params: DeleteTaskDto) {
        return this.todoService.deleteTask(params.task_id)
    }
}
