import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { UserController } from './user.controller';
import { PeerModule } from 'src/peer/peer.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User]), PeerModule],
  exports: [UserService],
})
export class UserModule {}
