import { randomUUID } from 'node:crypto';
import { InviteAggregate } from '../invite/invite.aggregate';

type GuestProps = {
  name: string;
  inviteId: string;
};

export class GuestEntity {
  private readonly _id: string;
  private _props: GuestProps;

  private constructor(id: string, props: GuestProps) {
    this._id = id;
    this._props = props;
  }

  static create(name: string, invite: InviteAggregate) {
    if (!invite.isDraft())
      throw new Error(
        `Cannot create guest to this invite because it status is ${invite.status}`,
      );
    if (invite.values.guestId)
      throw new Error(
        'Cannot create guest to this invite because it already have a guest',
      );
    const guest = new GuestEntity(randomUUID(), {
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
