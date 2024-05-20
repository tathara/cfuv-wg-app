import { Controller, Get, Param } from '@nestjs/common';
import { PeerService } from './peer.service';
import { IPeer } from './interfaces/peer.interface';

@Controller('key')
export class PeerController {
  constructor(private readonly keyService: PeerService) {}

  @Get()
  async getPeers(): Promise<IPeer[]> {
    return this.keyService.getPeers();
  }

  @Get(':name')
  async getPeer(@Param('name') name: string): Promise<IPeer> {
    return this.keyService.getPeer(name);
  }
}
