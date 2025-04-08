import { randomUUID } from 'node:crypto';

type GuestProps = {
  name: string;
  inviteId: string;
};

export class Guest {
  private readonly _id: string;
  private _props: GuestProps;

  private constructor(id: string, props: GuestProps) {
    this._id = id;
    this._props = props;
  }

  static create(name: string, inviteId: string) {
    return new Guest(randomUUID(), {
      name,
      inviteId,
    });
  }

  get values() {
    return {
      id: this._id,
      name: this._props.name,
      inviteId: this._props.inviteId,
    };
  }
}
