import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';

@Module({
  imports: [AuthModule, UsersModule, RoleModule],
  controllers: [AppController],
  providers: [AppService, RoleService],
})
export class AppModule {}
