import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from './dto/user.dto'

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('user/register')
    createUser(@Body() createUserDto: UserDto) {
        return this.authService.createUser(createUserDto.username, createUserDto.password)
    }

    @Post('user/login')
    loginUser(@Body() loginUserDto: UserDto) {
        return this.authService.loginUser(loginUserDto.username, loginUserDto.password)
    }

    @Get('token/refresh')
    refreshToken(@Req() req) {
        return this.authService.refreshToken(req.headers.authorization)
    }
}
