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
import { RoleService } from '../role/role.service';
import { WriteRole } from '../role/dto/insert-one.input';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '@prisma/client';
import { Roles } from '../role/role.decorator';
import { Role } from '../role/role.enum';
import { RolesGuard } from 'src/role/role.guard';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private roleService: RoleService,
  ) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  listUsers() {
    return this.userService.users({});
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/assign-role')
  assignRole(@Body() roleData: WriteRole, @Request() req: any) {
    const user: User = req['user'];
    return this.roleService.assignRole({
      userId: user.id,
      name: roleData.name,
      permissions: roleData.permissions,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.AdminCanDelete)
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser({ id });
  }
}
