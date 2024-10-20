import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PrismaService } from 'src/prisma.services';

@Module({
  providers: [RoleService, PrismaService],
  exports: [RoleService],
})
export class RoleModule {}
