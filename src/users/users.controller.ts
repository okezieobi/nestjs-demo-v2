import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleService } from 'src/role/role.service';
import { WriteRole } from 'src/role/dto/insert-one.input';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private roleService: RoleService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('/')
  listUsers() {
    return this.userService.users({ include: { roles: true } });
  }

  @HttpCode(HttpStatus.OK)
  @Post('/assign-role')
  assignRole(@Body() roleData: WriteRole, @Request() req) {
    const user: User = req['user'];
    return this.roleService.assignRole({
      userId: user.id,
      name: roleData.name,
      permissions: roleData.permissions,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
}
