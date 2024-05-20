import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { User } from './user.entity';

@Entity('peer')
export class Peer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ nullable: true, unique: true })
  path: string;

  @ManyToOne(() => User, (user) => user.peers)
  @JoinColumn({ name: 'user_id' })
  user: Relation<User>;
}
