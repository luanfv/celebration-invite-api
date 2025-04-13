import { InviteAggregate } from '../../domain/invite/invite.aggregate';

export interface InviteRepository {
  async save(invite: InviteAggregate): Promise<void>;
}
  