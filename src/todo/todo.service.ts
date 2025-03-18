import { ConflictException, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from './entities/task.entity'
import { User } from 'src/auth/entities/user.entity'

@Injectable()
export class TodoService {
    private readonly logger = new Logger(TodoService.name)
    
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRespository: Repository<User>,
    ) {}

    listTasks(username: string) {
        return this.taskRepository.find({ where: { user: { username: username } } })
    }

    async createTask(username: string, title: string, description: string | null, deadline: Date | null) {
        try {
            const task = new Task()
            const user = await this.userRespository.find({ where: { username: username } })

            this.logger.debug(user)

            if (!user.length) {
                throw new ConflictException('User not found')
            }

            task.user = user[0]
            task.title = title
            task.description = description
            task.deadline = deadline

            await this.taskRepository.save(task)
            return task.id
        } catch (error) {

            if (error instanceof ConflictException) {
                throw error
            }

            this.logger.error(error)
        }
    }

    async modifyTask(task_id: string, title: string, description: string, deadline: Date | null, completed: boolean) {
        await this.taskRepository.update({ id: task_id}, { title, description, deadline, completed })

        return task_id
    }

    async deleteTask(task_id: string) {
        await this.taskRepository.delete({ id: task_id})

        return task_id
    }
}
