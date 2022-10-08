import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(email: string) {
    const user = await this.prisma.user.findUnique({
      select: {
        email: true,
        firstName: true,
        lastName: true,
        addresses: true,
        createdAt: true,
      },
      where: {
        email: email,
      },
    });
    if (!user) throw new ForbiddenException('User not found');

    return user;
  }
}
