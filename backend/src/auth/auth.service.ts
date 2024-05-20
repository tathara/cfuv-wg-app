import { Injectable, NotFoundException } from '@nestjs/common';
import { BotService } from 'src/bot/bot.service';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly botService: BotService,
    private readonly userService: UserService,
  ) {}

  public async getCodeForUser(username: string): Promise<string> {
    try {
      const user = await this.userService.getUserByUsername(username);

      if (!user) throw new NotFoundException('User with requested username does not exist');

      const code = uuidv4().replace(/-/g, '').slice(0, 6);
      await this.botService.sendCodeToUser(user.chatId, code);

      return code;
    } catch (error) {
      console.error(error);
    }
  }

  public async isUser(username: string): Promise<boolean> {
    const user = await this.userService.getUserByUsername(username);

    return !!user;
  }
}
