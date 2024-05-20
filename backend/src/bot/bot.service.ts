import { Injectable } from '@nestjs/common';
import TelegramBot, { CallbackQuery, Message, SendBasicOptions } from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from 'src/config';
import { User } from 'src/db/entities/user.entity';
import { Commands, CommandsText } from 'src/enums';
import { PeerService } from 'src/peer/peer.service';
import { UserService } from 'src/user/user.service';

interface IMessageData {
  firstName: string;
  username: string;
  chatId: number;
  text: string;
}

interface ICallbackData {
  chatId: number;
  callback: string;
}

@Injectable()
export class BotService {
  private readonly bot: TelegramBot;

  constructor(
    private readonly userService: UserService,
    private readonly keyService: PeerService,
  ) {
    this.bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
    this.setupHandlers();
  }

  public async sendCodeToUser(chatId: number, code: string): Promise<Message> {
    try {
      return this.bot.sendMessage(chatId, `Ваш код для авторизации на сайте: ||${code}||`, {
        parse_mode: 'MarkdownV2',
      });
    } catch (error) {
      console.error(error);
    }
  }

  private setupHandlers() {
    this.bot.on('message', async (message: Message) => await this.onMessage(message));
    this.bot.on(
      'callback_query',
      async (callbackQuery: CallbackQuery) => await this.onCallbackQuery(callbackQuery),
    );
  }

  private async onMessage(message: Message) {
    try {
      const { firstName, username, chatId, text } = this.getMessageData(message);

      let user = await this.userService.getUserByChatId(chatId);

      if (!user) {
        user = await this.userService.createUser(username, chatId);
        await this.bot.sendMessage(
          chatId,
          `Здравствуйте, ${firstName}, Ваш профиль ${username} был успешно сохранен!`,
        );
      }

      switch (text) {
        case Commands.START:
          return this.sendMainMenu(user);

        case CommandsText.ADD:
          return this.addKeyToUser(user);

        case CommandsText.DELETE:
          if (!user.peers.length)
            return this.bot.sendMessage(chatId, '❗️ *Список ваших VPN ключей пуст*', {
              parse_mode: 'Markdown',
            });

          return this.deleteUsersKey(user);

        default:
          return this.bot.deleteMessage(chatId, message.message_id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async onCallbackQuery(callbackQuery: CallbackQuery) {
    try {
      const { chatId, callback } = this.getCallbackData(callbackQuery);
      const user = await this.userService.getUserByChatId(chatId);

      const keyToDelete = await this.keyService.deleteUsersPeer(user, callback);
      await this.bot.sendMessage(user.chatId, `❗️ Ключ ${keyToDelete} успешно удален!`);

      const updatedUser = await this.userService.getUserByChatId(chatId);
      return this.sendMainMenu(updatedUser);
    } catch (error) {
      console.error(error);
    }
  }

  private getMessageData(message: Message): IMessageData {
    const chatId = message.chat.id;
    const { first_name, username } = message.from;
    const text = message.text;

    return {
      firstName: first_name,
      username,
      chatId,
      text,
    };
  }

  private getCallbackData(callbackQuery: CallbackQuery): ICallbackData {
    const chatId = callbackQuery.from.id;
    const callback = callbackQuery.data;

    return {
      chatId,
      callback,
    };
  }

  private sendMainMenu(user: User): Promise<Message> {
    const menuText = this.makeMenuText(user);
    const botOptions = this.makeBotOptions();

    return this.bot.sendMessage(user.chatId, menuText, { ...botOptions, parse_mode: 'Markdown' });
  }

  private makeMenuText(user: User): string {
    let menuText = '🛠 Вы сейчас находитесь в главном меню\n\n';

    if (!user.peers.length) {
      menuText += '❗️ *Список ваших VPN ключей пуст*';
      return menuText;
    }

    menuText += '❗️ *Список ваших VPN ключей:*\n';
    for (let i = 0; i < user.peers.length; i++) {
      menuText += `\t${i + 1}. ${user.peers[i].name}\n`;
    }

    return menuText;
  }

  private makeBotOptions(): SendBasicOptions {
    return {
      reply_markup: {
        keyboard: [[{ text: CommandsText.ADD }, { text: CommandsText.DELETE }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    };
  }

  private async addKeyToUser(user: User): Promise<Message> {
    const peer = await this.keyService.createPeerForUser(user);

    await this.bot.sendMessage(
      user.chatId,
      '✅ Вот ваш конфигурационный файл для приложения WireGuard:',
    );
    await this.bot.sendDocument(user.chatId, peer.path + '.conf');
    await this.bot.sendPhoto(user.chatId, peer.path + '.png');

    const updatedUser = await this.userService.getUserByChatId(user.chatId);
    return this.sendMainMenu(updatedUser);
  }

  private async deleteUsersKey(user: User): Promise<any> {
    try {
      const keysOptions = this.makeKeysOptions(user);
      await this.bot.sendMessage(
        user.chatId,
        '⁉️ Выберите ключ, который необходимо удалить',
        keysOptions,
      );
    } catch (error) {
      console.error(error);
    }
  }

  private makeKeysOptions(user: User): SendBasicOptions {
    const keysButtons = user.peers.map((peer) => [{ text: peer.name, callback_data: peer.name }]);
    return {
      reply_markup: {
        inline_keyboard: keysButtons,
      },
    };
  }
}
