import { InviteAggregate } from '../../../domain/invite/invite.aggregate';
import { InviteRepository } from '../../../application/repository/invite.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InviteMemoryRepository implements InviteRepository {
  private _invites: InviteAggregate[] = [];

  async save(invite: InviteAggregate): Promise<void> {
    this._invites.push(invite);
  }
}
