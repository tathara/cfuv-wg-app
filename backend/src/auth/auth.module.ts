import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { BotModule } from 'src/bot/bot.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [BotModule, UserModule],
  exports: [AuthService],
})
export class AuthModule {}
