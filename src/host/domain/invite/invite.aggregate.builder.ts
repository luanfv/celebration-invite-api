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
    [InviteStatusEnum.ACCEPTED]: AcceptedStatusState,
    [InviteStatusEnum.DRAFT]: DraftStatusState,
    [InviteStatusEnum.EXPIRED]: ExpiredStatusState,
    [InviteStatusEnum.PENDENT]: PendentStatusState,
    [InviteStatusEnum.REJECTED]: RejectedStatusState,
    [InviteStatusEnum.REVOKED]: RevokedStatusState,
  };

  constructor() {
    const celebration = new CelebrationAggregateBuilder().build();
    this._invite = InviteAggregate.create(celebration);
  }

  withStatusValue(statusValue: InviteStatusEnum) {
    this._invite.status = new this._statusStrategy[statusValue]();
    return this;
  }

  build() {
    return this._invite;
  }
}
