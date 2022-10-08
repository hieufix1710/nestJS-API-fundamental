import { Injectable, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  validate(payload: { sub: number; email: string }) {
    const user = this.prisma.user.findUnique({
      select: {
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials not valid');
    }
    return user;
  }
}
