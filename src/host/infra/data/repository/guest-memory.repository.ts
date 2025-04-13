import { GuestEntity } from '../../../domain/guest/guest.entity';
import { GuestRepository } from '../../../application/repository/guest.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GuestMemoryRepository implements GuestRepository {
  private _guests: GuestEntity[] = [];

  async save(guest: GuestEntity): Promise<void> {
    this._guests.push(guest);
  }
}
