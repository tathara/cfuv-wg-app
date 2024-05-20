import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFile } from 'fs/promises';
import { Peer } from 'src/db/entities/peer.entity';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import { IPeer } from './interfaces/peer.interface';
import { IPeerData } from './interfaces/peerData.interface';

@Injectable()
export class PeerService {
  constructor(@InjectRepository(Peer) private readonly peerRepo: Repository<Peer>) {}

  public async createPeerForUser(user: User): Promise<IPeer> {
    try {
      const peer = await this.peerRepo.save({ user });
      const data = await this.getPeerConfigAndQR(peer.path);

      return { name: peer.name, path: peer.path, data };
    } catch (error) {
      console.error(error);
    }
  }

  public async getPeers(): Promise<IPeer[]> {
    try {
      const peers = await this.peerRepo
        .createQueryBuilder('peer')
        .leftJoinAndSelect('peer.user', 'user')
        .getMany();
      const peersData = [];

      for (const peer of peers) {
        const name = peer.name;
        const { config, qrcode } = await this.getPeerConfigAndQR(peer.path);

        peersData.push({ name, config, qrcode });
      }

      return peersData;
    } catch (error) {
      console.error(error);
    }
  }

  public async getPeer(name: string): Promise<IPeer> {
    try {
      const peer = await this.peerRepo
        .createQueryBuilder('peer')
        .leftJoinAndSelect('peer.user', 'user')
        .where('peer.name = :name', { name })
        .getOne();

      const data = await this.getPeerConfigAndQR(peer.path);

      return { name, data };
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteUsersPeer(user: User, name: string): Promise<string> {
    try {
      const isUserPeer = user.peers.find((peer) => peer.name === name);

      if (!isUserPeer)
        throw new NotFoundException(
          `User \'${user.username}\' has no peer with requested name \'${name}\'`,
        );

      await this.peerRepo
        .createQueryBuilder()
        .delete()
        .from(Peer)
        .where('name = :name', { name })
        .execute();

      return name;
    } catch (error) {
      console.error(error);
    }
  }

  public async getPeerConfigAndQR(path: string): Promise<IPeerData> {
    try {
      const config = await readFile(path + '.conf', 'utf-8');
      const qrcode = (await readFile(path + '.png')).toString('base64');

      return { config, qrcode };
    } catch (error) {
      console.error(error);
    }
  }
}
