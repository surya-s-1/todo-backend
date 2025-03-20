import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
  
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
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
  