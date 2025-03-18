import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDto, DeleteTaskDto, ListTasksDto, ModifyTaskDto } from './dto/task.dto';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get('list/:username')
    listTasks(@Param() params: ListTasksDto) {
        return this.todoService.listTasks(params.username)
    }

    @Post('create')
    createTask(@Body() createTaskDto: CreateTaskDto) {
        const { username, title, description = null, deadline = null } = createTaskDto

        return this.todoService.createTask(username, title, description, deadline)
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
