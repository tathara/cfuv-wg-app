import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { Peer } from '../entities/peer.entity';
import { join } from 'path';

@EventSubscriber()
export class PeerSubscriber implements EntitySubscriberInterface<Peer> {
  listenTo() {
    return Peer;
  }

  async afterInsert(event: InsertEvent<Peer>) {
    const peer = event.entity;
    peer.name = 'peer' + peer.id;
    peer.path = join(process.cwd(), 'configs', peer.name, peer.name);
    return event.manager.save(Peer, peer);
  }
}
