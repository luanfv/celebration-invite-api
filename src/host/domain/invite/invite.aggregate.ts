import { randomUUID } from 'node:crypto';
import { CelebrationAggregate } from '../celebration/celebration.aggregate';
import { InviteStatusEnum, StatusState } from './state/status.state';
import { DraftStatusState } from './state/draft-status.state';

type InviteProps = {
  guestId?: string;
  expireAt: Date;
  status: StatusState;
  celebrationId: string;
};

export class InviteAggregate {
  private readonly _id: string;
  private _props: InviteProps;

  private constructor(id: string, props: InviteProps) {
    this._id = id;
    this._props = props;
  }

  static create(celebration: CelebrationAggregate) {
    if (celebration.isAbandoned())
      throw new Error('Cannot create invite to abandoned celebration');
    if (celebration.isClosed())
      throw new Error('Cannot create invite to closed celebration');
    const id = randomUUID();
    return new InviteAggregate(id, {
      expireAt: celebration.values.date,
      status: new DraftStatusState(),
      celebrationId: celebration.values.id,
    });
  }

  set guestId(guestId: string) {
    this._props.guestId = guestId;
  }

  get status(): string {
    return this._props.status.value.toString();
  }

  set status(status: StatusState) {
    this._props.status = status;
  }

  get values() {
    return {
      id: this._id,
      guestId: this._props.guestId,
      expireAt: this._props.expireAt,
      status: this._props.status.value.toString(),
      celebrationId: this._props.celebrationId,
    };
  }

  isDraft(): boolean {
    return this._props.status.value === InviteStatusEnum.DRAFT;
  }

  isPendent(): boolean {
    return this._props.status.value === InviteStatusEnum.PENDENT;
  }

  isAccepted(): boolean {
    return this._props.status.value === InviteStatusEnum.ACCEPTED;
  }

  isRejected(): boolean {
    return this._props.status.value === InviteStatusEnum.REJECTED;
  }

  isExpired(): boolean {
    return this._props.status.value === InviteStatusEnum.EXPIRED;
  }

  isRevoked(): boolean {
    return this._props.status.value === InviteStatusEnum.REVOKED;
  }
}
