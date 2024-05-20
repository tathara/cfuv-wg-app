import { Controller, Get, Post, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/db/entities/user.entity';
import { PeerService } from 'src/peer/peer.service';
import { IPeer } from 'src/peer/interfaces/peer.interface';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly peerService: PeerService,
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    return this.userService.getUserByUsername(username);
  }

  @Post(':username/peers')
  async createPeerForUser(@Param('username') username: string): Promise<IPeer> {
    const user = await this.userService.getUserByUsername(username);

    if (!user)
      throw new NotFoundException(`There is no user with requested username \'${username}\'`);

    return this.peerService.createPeerForUser(user);
  }

  @Get(':username/peers')
  async getUserPeers(@Param('username') username: string): Promise<IPeer[]> {
    return this.userService.getUserPeers(username);
  }

  @Delete(':username/peers/:name')
  async deleteUsersPeer(
    @Param('username') username: string,
    @Param('name') name: string,
  ): Promise<string> {
    const user = await this.userService.getUserByUsername(username);

    if (!user)
      throw new NotFoundException(`There is no user with requested username \'${username}\'`);

    return this.peerService.deleteUsersPeer(user, name);
  }
}
