import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.services';
import { UsersController } from './users.controller';
import { RoleService } from 'src/role/role.service';

@Module({
  providers: [UsersService, RoleService, PrismaService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
