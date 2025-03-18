import { ConflictException, UnauthorizedException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from './entities/user.entity'

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
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

            await this.userRepository.save(user)

            return user.id
        } catch (error) {
            this.logger.error(error)
            
            if (error instanceof ConflictException) {
                throw error
            }

            throw new InternalServerErrorException('Failed to create user')
        }
    }

    async loginUser(username: string, password: string) {
        try {
            const user = await this.userRepository.findOne({ where: { username } })
            
            if (!user) {
                throw new UnauthorizedException('User does not exist')
            }

            const isPasswordValid = await bcrypt.compare(password, user.password)
            
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials')
            }

            const payload = { username: user.username, sub: user.id }

            return {
                access_token: await this.jwtService.signAsync({ ...payload, type: 'access_token' }, { expiresIn: '30m' })
            }

        } catch (error) {
            this.logger.error(error)
            
            if (error instanceof UnauthorizedException) {
                throw error
            }

            throw new InternalServerErrorException('Failed to login user')
        }
    }
}
