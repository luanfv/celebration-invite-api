import { randomUUID } from 'node:crypto';
import { Invite } from './entities/invite.entity';
import { AddressVO } from './value-objects/address.vo';

enum CelebrationStatusEnum {
  OPENED = 'OPENED',
  CONFIRMED = 'CONFIRMED',
  CLOSED = 'CLOSED',
  ABANDONED = 'ABANDONED',
}

type CelebrationProps = {
  title: string;
  status: CelebrationStatusEnum;
  description: string;
  address: AddressVO;
  invites: Invite[];
  date: Date;
  createdAt: Date;
};

type CelebrationCreateProps = {
  title: string;
  description: string;
  date: Date;
  addressCep: string;
  addressStreet: string;
  addressNumber: number;
  invites: {
    maxGuest: number;
    guests: {
      name: string;
      age: number;
      obligatory: boolean;
    }[];
    expireAt: Date;
  }[];
};

export class CelebrationAggregate {
  private readonly _id: string;
  private _props: CelebrationProps;

  private constructor(id: string, props: CelebrationProps) {
    this._id = id;
    this._props = props;
  }

  static create({
    addressCep,
    addressNumber,
    addressStreet,
    date,
    description,
    title,
    invites,
  }: CelebrationCreateProps) {
    return new CelebrationAggregate(randomUUID(), {
      address: new AddressVO(addressStreet, addressCep, addressNumber),
      createdAt: new Date(),
      date,
      description,
      invites: [],
      status: CelebrationStatusEnum.OPENED,
      title,
    });
  }
}
