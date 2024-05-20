import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { IPeer } from 'src/peer/interfaces/peer.interface';
import { PeerService } from 'src/peer/peer.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly peerService: PeerService,
  ) {}

  public async createUser(username: string, chatId: number): Promise<User> {
    try {
      const peers = [];
      return this.userRepo.save({ username, chatId, peers });
    } catch (error) {
      console.error(error);
    }
  }

  public async getUsers(): Promise<User[]> {
    try {
      return this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.peers', 'peers')
        .getMany();
    } catch (error) {
      console.error(error);
    }
  }

  public async getUserByUsername(username: string): Promise<User> {
    try {
      return this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.peers', 'peers')
        .where('user.username = :username', { username })
        .getOne();
    } catch (error) {
      console.error(error);
    }
  }

  public async getUserByChatId(chatId: number): Promise<User> {
    try {
      return this.userRepo
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.peers', 'peers')
        .where('user.chatId = :chatId', { chatId })
        .getOne();
    } catch (error) {
      console.error(error);
    }
  }

  public async getUserPeers(username: string): Promise<IPeer[]> {
    try {
      const user = await this.getUserByUsername(username);

      const peers = [];
      for (const peer of user.peers) {
        const name = peer.name;
        const data = await this.peerService.getPeerConfigAndQR(peer.path);

        peers.push({ name, data });
      }

      return peers;
    } catch (error) {
      console.error(error);
    }
  }
}
