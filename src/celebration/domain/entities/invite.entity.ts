import { randomUUID } from 'node:crypto';
import { Guest } from './guest.entity';

enum InviteStatusEnum {
  PENDENT = 'PENDENT',
  ACCEPTED = 'ACCEPTED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

type InviteProps = {
  maxGuest: number;
  guests: Guest[];
  expireAt: Date;
  status: InviteStatusEnum;
};

type InviteCreateProps = {
  guests: {
    name: string;
    age: number;
    obligatory: boolean;
  }[];
  expireAt: Date;
  maxGuest: number;
};

export class Invite {
  private _id: string;
  private _props: InviteProps;

  private constructor(id: string, props: InviteProps) {
    this._id = id;
    this._props = props;
  }

  static create({ expireAt, guests, maxGuest }: InviteCreateProps) {
    return new Invite(randomUUID(), {
      expireAt,
      guests: guests.map((guest) =>
        Guest.create(guest.name, guest.age, guest.obligatory),
      ),
      maxGuest,
      status: InviteStatusEnum.PENDENT,
    });
  }
}
