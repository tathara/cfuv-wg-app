import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Peer } from 'src/db/entities/peer.entity';
import { UserModule } from 'src/user/user.module';
import { PeerModule } from 'src/peer/peer.module';

@Module({
  providers: [BotService],
  imports: [TypeOrmModule.forFeature([User, Peer]), UserModule, PeerModule],
  exports: [BotService],
})
export class BotModule {}
