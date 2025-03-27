import { randomUUID } from 'node:crypto';
import { AddressVO } from './value-object/address.vo';
import {
  AbandonedStatusState,
  CelebrationStatusEnum,
  ClosedStatusState,
  ConfirmedStatusState,
  OpenedStatusState,
  StatusState,
} from './state';
import { AggregateRoot } from '@nestjs/cqrs';
import { ConfirmCelebrationEvent } from './event/confirm-celebration.event';

type CelebrationProps = {
  title: string;
  status: StatusState;
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

export class CelebrationAggregate extends AggregateRoot {
  private readonly _id: string;
  private _props: CelebrationProps;

  private constructor(id: string, props: CelebrationProps) {
    super();
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
      status: this.generateStatus(CelebrationStatusEnum.OPENED),
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
    return new CelebrationAggregate(id, {
      address: new AddressVO(addressStreet, addressZipCode, addressNumber),
      date,
      description,
      status: this.generateStatus(status),
      title,
      updatedAt,
      createdAt,
    });
  }

  private static generateStatus(status: string) {
    const statusFound: CelebrationStatusEnum = CelebrationStatusEnum[status];
    if (!statusFound)
      throw new Error(`Celebration - status equal ${status} not exists`);
    switch (statusFound) {
      case CelebrationStatusEnum.OPENED:
        return new OpenedStatusState();
      case CelebrationStatusEnum.ABANDONED:
        return new AbandonedStatusState();
      case CelebrationStatusEnum.CLOSED:
        return new ClosedStatusState();
      case CelebrationStatusEnum.CONFIRMED:
        return new ConfirmedStatusState();
      default:
        return new OpenedStatusState();
    }
  }

  set status(status: StatusState) {
    this._props.status = status;
  }

  get status(): string {
    return this._props.status.value;
  }

  get values() {
    return {
      id: this._id,
      title: this._props.title,
      description: this._props.description,
      date: this._props.date,
      createdAt: this._props.createdAt,
      updatedAt: this._props.updatedAt,
      status: this._props.status.value,
      address: {
        zipCode: this._props.address.zipCode,
        street: this._props.address.street,
        number: this._props.address.number,
      },
    };
  }

  changeToConfirmed() {
    this._props.status.confirm(this);
    this._props.updatedAt = new Date();
    this.apply(new ConfirmCelebrationEvent(this));
  }
}
