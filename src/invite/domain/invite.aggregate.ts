import { randomUUID } from 'node:crypto';
import { Guest } from './entity/guest.entity';

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
  celebrationId: string;
};

type InviteCreateProps = {
  guests: {
    name: string;
    age: number;
    obligatory?: boolean;
  }[];
  expireAt: Date;
  maxGuest: number;
  celebrationId: string;
};

export class InviteAggregate {
  private readonly _id: string;
  private _props: InviteProps;

  private constructor(id: string, props: InviteProps) {
    this._id = id;
    this._props = props;
  }

  static create({
    expireAt,
    guests,
    maxGuest,
    celebrationId,
  }: InviteCreateProps) {
    if (0 >= maxGuest)
      throw new Error('Invite - max guest cannot be less than 1');
    if (guests.length > maxGuest)
      throw new Error('Invite - guest list cannot be more than max guest');

    return new InviteAggregate(randomUUID(), {
      expireAt,
      guests: guests.map((guest) =>
        Guest.create(guest.name, guest.age, guest.obligatory),
      ),
      maxGuest,
      status: InviteStatusEnum.PENDENT,
      celebrationId,
    });
  }

  get values() {
    return {
      id: this._id,
      guests: this._props.guests.map((guest) => guest.values),
      expireAt: this._props.expireAt,
      maxGuest: this._props.maxGuest,
      status: this._props.status.toString(),
    };
  }
}
