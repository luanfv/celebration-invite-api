import { Guest } from '../../domain/guest/guest.entity';

export interface GuestRepository {
  async save(guest: Guest): Promise<void>;
}
  