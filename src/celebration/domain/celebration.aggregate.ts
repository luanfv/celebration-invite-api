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
  addressZipCode: string;
  addressStreet: string;
  addressNumber: number;
};

type CelebrationRestoreProps = {
  id: string;
  title: string;
  description: string;
  date: Date;
  addressZipCode: string;
  addressStreet: string;
  addressNumber: number;
};

export class CelebrationAggregate {
  private readonly _id: string;
  private _props: CelebrationProps;

  private constructor(id: string, props: CelebrationProps) {
    this._id = id;
    this._props = props;
  }

  static create({
    addressZipCode,
    addressNumber,
    addressStreet,
    date,
    description,
    title,
  }: CelebrationCreateProps) {
    return new CelebrationAggregate(randomUUID(), {
      address: new AddressVO(addressStreet, addressZipCode, addressNumber),
      createdAt: new Date(),
      date,
      description,
      invites: [],
      status: CelebrationStatusEnum.OPENED,
      title,
    });
  }

  static restore({
    id,
    addressZipCode,
    addressNumber,
    addressStreet,
    date,
    description,
    title,
  }: CelebrationRestoreProps) {
    return new CelebrationAggregate(id, {
      address: new AddressVO(addressStreet, addressZipCode, addressNumber),
      createdAt: new Date(),
      date,
      description,
      invites: [],
      status: CelebrationStatusEnum.OPENED,
      title,
    });
  }

  get values() {
    return {
      id: this._id,
      title: this._props.title,
      description: this._props.description,
      date: this._props.date,
      createAt: this._props.createdAt,
      status: this._props.status.toString(),
      address: {
        zipCode: this._props.address.zipCode,
        street: this._props.address.street,
        number: this._props.address.number,
      },
      invites: this._props.invites
        ? this._props.invites.map((invite) => invite.values)
        : [],
    };
  }
}
