import { Module } from '@nestjs/common';
import { PeerService } from './peer.service';
import { Peer } from 'src/db/entities/peer.entity';
import { PeerController } from './peer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PeerService],
  controllers: [PeerController],
  imports: [TypeOrmModule.forFeature([Peer])],
  exports: [PeerService],
})
export class PeerModule {}
