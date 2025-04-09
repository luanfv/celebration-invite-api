import { randomUUID } from 'node:crypto';
import { InviteAggregate } from '../invite.aggregate';

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

  static create(name: string, invite: InviteAggregate) {
    if (invite.status !== 'PENDENT')
      throw new Error('The invite is not pendent');
    if (invite.values.guestId)
      throw new Error('The invite already has a guest');
    const guest = new Guest(randomUUID(), {
      name,
      inviteId: invite.values.id,
    });
    invite.guestId = guest._id;
    return guest;
  }

  get values() {
    return {
      id: this._id,
      name: this._props.name,
      inviteId: this._props.inviteId,
    };
  }
}
