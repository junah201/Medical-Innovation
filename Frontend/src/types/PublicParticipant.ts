import { PublicEvent } from './publicEvent';

export interface PublicParticipant {
  id: number;
  public_event_id: number;
  public_event: PublicEvent;
  application: any;
}

export interface PublicParticipantUpdate {
  application: any;
}
