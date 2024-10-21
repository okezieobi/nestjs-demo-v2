import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.services';
import { RoleService } from '../role/role.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [JwtService, UsersService, RoleService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
