import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.services';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async assignRole(parms: {
    where: Prisma.RoleWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoleCreateInput, Prisma.RoleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RoleUpdateInput, Prisma.RoleUncheckedUpdateInput>;
  }) {
    const { where, update, create } = parms;
    return this.prisma.role.upsert({ where, create, update });
  }
}
