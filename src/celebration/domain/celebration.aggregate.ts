import { randomUUID } from 'node:crypto';
import { AddressVO } from './value-object/address.vo';

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
  date: Date;
  createdAt: Date;
  updatedAt: Date;
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
  status: string;
  updatedAt: Date;
  createdAt: Date;
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
      updatedAt: new Date(),
      date,
      description,
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
    status,
    createdAt,
    updatedAt,
  }: CelebrationRestoreProps) {
    const statusFound = CelebrationStatusEnum[status];
    if (!statusFound)
      throw new Error(`Celebration - status = ${status} is invalid`);
    return new CelebrationAggregate(id, {
      address: new AddressVO(addressStreet, addressZipCode, addressNumber),
      date,
      description,
      status: statusFound,
      title,
      updatedAt,
      createdAt,
    });
  }

  get values() {
    return {
      id: this._id,
      title: this._props.title,
      description: this._props.description,
      date: this._props.date,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
      status: this._props.status.toString(),
      address: {
        zipCode: this._props.address.zipCode,
        street: this._props.address.street,
        number: this._props.address.number,
      },
    };
  }

  changeToConfirmed() {
    switch (this._props.status) {
      case CelebrationStatusEnum.CONFIRMED:
        return undefined;
      case CelebrationStatusEnum.ABANDONED:
      case CelebrationStatusEnum.CLOSED:
        throw new Error(
          `Celebration - cannot confirm with status equal ${this._props.status}`,
        );
      default:
        break;
    }

    this._props.status = CelebrationStatusEnum.CONFIRMED;
    this._props.updatedAt = new Date();
    // send event
  }
}
