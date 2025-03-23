import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { AuthService } from './auth.service'
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService : AuthService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if (!token) {
            throw new UnauthorizedException()
        }

        const payload = await this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET})

        if (!payload.sub) {
            throw new UnauthorizedException('Invalid token')
        }

        const user_exists = await this.authService.checkUserExists(payload.sub)

        if (!user_exists) {
            throw new UnauthorizedException("User doesn't exist")
        }

        if (payload.type !== 'access_token') {
            throw new UnauthorizedException('Invalid token type')
        }

        request['user_id'] = payload.sub

        return true
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
  