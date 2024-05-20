import { IPeerData } from './IPeerData';

export interface IPeer {
  name: string;
  path?: string;
  data: IPeerData;
}
