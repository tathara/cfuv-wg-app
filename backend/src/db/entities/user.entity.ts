import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Peer } from './peer.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'bigint', unique: true, name: 'chat_id' })
  chatId: number;

  @OneToMany(() => Peer, (peer) => peer.user)
  peers: Relation<Peer[]>;
}
