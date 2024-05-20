import { IPeerData } from './peerData.interface';

export interface IPeer {
  name: string;

  path?: string;

  data: IPeerData;
}
