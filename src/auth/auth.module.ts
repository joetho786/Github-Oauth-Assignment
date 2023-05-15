import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthControllerController } from './auth.controller.controller';
import { UserModule } from 'src/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, HttpModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService],
  controllers: [AuthControllerController],
})
export class AuthModule {}
