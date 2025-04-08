import { randomUUID } from 'node:crypto';
import { Guest } from './entity/guest.entity';
import { CelebrationAggregate } from './celebration.aggregate';

enum InviteStatusEnum {
  PENDENT = 'PENDENT',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

type InviteProps = {
  guest: Guest;
  expireAt: Date;
  status: InviteStatusEnum;
  celebrationId: string;
};

type InviteCreateProps = {
  guestName: string;
};

export class InviteAggregate {
  private readonly _id: string;
  private _props: InviteProps;

  private constructor(id: string, props: InviteProps) {
    this._id = id;
    this._props = props;
  }

  static create(
    { guestName }: InviteCreateProps,
    celebration: CelebrationAggregate,
  ) {
    const id = randomUUID();
    return new InviteAggregate(id, {
      expireAt: celebration.values.date,
      guest: Guest.create(guestName, id),
      status: InviteStatusEnum.PENDENT,
      celebrationId: celebration.values.id,
    });
  }

  get guest() {
    return this._props.guest;
  }

  get values() {
    return {
      id: this._id,
      guest: this._props.guest.values,
      expireAt: this._props.expireAt,
      status: this._props.status.toString(),
      celebrationId: this._props.celebrationId,
    };
  }
}
