import { InviteAggregate } from '../invite.aggregate';
import { AcceptedStatusState } from './accepted-status.state';
import { ExpiredStatusState } from './expired-status.state';
import { RejectedStatusState } from './rejected-status.state';
import { RevokedStatusState } from './revoked-status.state';
import { AbstractStatusState, InviteStatusEnum } from './status.state';

export class PendentStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = InviteStatusEnum.PENDENT;
  }

  accept(invite: InviteAggregate): void {
    invite.status = new AcceptedStatusState();
  }

  reject(invite: InviteAggregate): void {
    invite.status = new RejectedStatusState();
  }

  revoke(invite: InviteAggregate): void {
    invite.status = new RevokedStatusState();
  }

  expire(invite: InviteAggregate): void {
    invite.status = new ExpiredStatusState();
  }
}
