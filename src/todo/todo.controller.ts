import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDto, DeleteTaskDto, MarkCompleteDto, ModifyTaskDto } from './dto/task.dto';
import { AuthGuard } from 'src/auth/auth.gaurd';

@UseGuards(AuthGuard)
@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get('list')
    listTasks(@Req() req) {
        return this.todoService.listTasks(req?.user_id)
    }

    @Post('create')
    createTask(@Body() createTaskDto: CreateTaskDto, @Req() req) {
        const { title, description = null, deadline = null, color_code = null } = createTaskDto

        return this.todoService.createTask(req?.user_id, title, description, deadline, color_code)
    }

    @Put('update')
    updateTask(@Body() modifyTaskDto: ModifyTaskDto, @Req() req) {
        const { task_id, title, description = null, deadline = null, completed = false, color_code = null } = modifyTaskDto
        
        return this.todoService.updateTask(req?.user_id, task_id, title, description, deadline, completed, color_code)
    }

    @Put('mark-complete')
    markCompleteTask(@Body() markCompleteDto: MarkCompleteDto, @Req() req) {
        const { task_id, completed } = markCompleteDto
        
        return this.todoService.markComplete(req?.user_id, task_id, completed)
    }

    @Delete('delete/:task_id')
    deleteTask(@Param() params: DeleteTaskDto,@Req() req) {
        return this.todoService.deleteTask(req?.user_id, params.task_id)
    }
}
