import { randomUUID } from 'node:crypto';
import { CelebrationAggregate } from './celebration.aggregate';

enum InviteStatusEnum {
  PENDENT = 'PENDENT',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

type InviteProps = {
  guestId?: string;
  expireAt: Date;
  status: InviteStatusEnum;
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
      status: InviteStatusEnum.PENDENT,
      celebrationId: celebration.values.id,
    });
  }

  set guestId(guestId: string) {
    this._props.guestId = guestId;
  }

  get status() {
    return this._props.status.toString();
  }

  get values() {
    return {
      id: this._id,
      guestId: this._props.guestId,
      expireAt: this._props.expireAt,
      status: this._props.status.toString(),
      celebrationId: this._props.celebrationId,
    };
  }
}
