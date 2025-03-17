import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './entities/user.entity'

@Injectable()
export class TodoService {
    private readonly logger = new Logger(TodoService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async createUser(username: string, password: string) {
        try {
            const existingUser = await this.userRepository.findOne({ where: { username } })
            
            if (existingUser) { 
                throw new ConflictException('User already exists')
            }

            const user = new User()
            user.username = username
            user.password = await bcrypt.hash(password, 10)

            return this.userRepository.save(user)
        } catch (error) {
            this.logger.error(error)
            
            if (error instanceof ConflictException) {
                throw error
            }

            throw new InternalServerErrorException('Failed to create user')
        }
    }
}
