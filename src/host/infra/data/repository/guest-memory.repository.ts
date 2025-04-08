import { Guest } from '../../../domain/entity/guest.entity';
import { GuestRepository } from '../../../application/repository/guest.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GuestMemoryRepository implements GuestRepository {
  private _guests: Guest[] = [];

  async save(guest: Guest): Promise<void> {
    this._guests.push(guest);
  }
}
