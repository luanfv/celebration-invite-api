import { InviteAggregate } from '../../domain/invite.aggregate';

export interface InviteRepository {
  async create(invite: InviteAggregate): Promise<void>;
}
  