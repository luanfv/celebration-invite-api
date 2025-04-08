import { Guest } from '../../domain/entity/guest.entity';

export interface GuestRepository {
  async save(guest: Guest): Promise<void>;
}
  