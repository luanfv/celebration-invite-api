import { InviteAggregate } from '../../domain/invite.aggregate';

export interface InviteRepository {
  async save(invite: InviteAggregate): Promise<void>;
}
  