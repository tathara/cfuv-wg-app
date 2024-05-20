import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PeerModule } from './peer/peer.module';
import { dbConnectionOptions } from './db';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConnectionOptions),
    AuthModule,
    BotModule,
    UserModule,
    PeerModule,
  ],
})
export class AppModule {}
