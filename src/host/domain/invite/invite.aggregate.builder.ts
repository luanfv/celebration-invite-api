import { CelebrationAggregateBuilder } from '../celebration/celebration.aggregate.builder';
import { InviteAggregate } from './invite.aggregate';
import {
  AcceptedStatusState,
  DraftStatusState,
  ExpiredStatusState,
  InviteStatusEnum,
  PendentStatusState,
  RejectedStatusState,
  RevokedStatusState,
} from './state';

export class InviteAggregateBuilder {
  private _invite: InviteAggregate;
  private _statusStrategy = {
    [InviteStatusEnum.ACCEPTED]: new AcceptedStatusState(),
    [InviteStatusEnum.DRAFT]: new DraftStatusState(),
    [InviteStatusEnum.EXPIRED]: new ExpiredStatusState(),
    [InviteStatusEnum.PENDENT]: new PendentStatusState(),
    [InviteStatusEnum.REJECTED]: new RejectedStatusState(),
    [InviteStatusEnum.REVOKED]: new RevokedStatusState(),
  };

  constructor() {
    const celebration = new CelebrationAggregateBuilder().build();
    this._invite = InviteAggregate.create(celebration);
  }

  withStatusValue(statusValue: InviteStatusEnum) {
    this._invite.status = this._statusStrategy[statusValue];
    return this;
  }

  build() {
    return this._invite;
  }
}
