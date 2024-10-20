import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.services';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async assignRole(parms: {
    userId: string;
    name: string;
    permissions: string[];
  }) {
    const { userId, name, permissions } = parms;
    const exists = await this.prisma.role.findUnique({
      where: { name, id: userId },
    });
    if (exists) {
      return this.prisma.role.update({
        where: { id: exists.id, users: { every: { id: userId } } },
        data: { permissions },
      });
    }
    return this.prisma.role.create({
      data: { name, permissions, users: { connect: { id: userId } } },
    });
  }
}
