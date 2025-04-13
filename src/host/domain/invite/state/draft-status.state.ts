import { InviteAggregate } from '../invite.aggregate';
import { ExpiredStatusState } from './expired-status.state';
import { PendentStatusState } from './pendent-status.state';
import { RevokedStatusState } from './revoked-status.state';
import { AbstractStatusState, InviteStatusEnum } from './status.state';

export class DraftStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = InviteStatusEnum.DRAFT;
  }

  pendent(invite: InviteAggregate): void {
    invite.status = new PendentStatusState();
  }

  revoke(invite: InviteAggregate): void {
    invite.status = new RevokedStatusState();
  }

  expire(invite: InviteAggregate): void {
    invite.status = new ExpiredStatusState();
  }
}
