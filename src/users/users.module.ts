import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.services';
import { UsersController } from './users.controller';
import { RoleService } from 'src/role/role.service';
import { RolesGuard } from 'src/role/role.guard';

@Module({
  providers: [
    UsersService,
    RoleService,
    PrismaService,
    { useClass: RolesGuard, provide: 'APP_GUARD' },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
