import { InviteAggregate } from '../invite.aggregate';

export enum InviteStatusEnum {
  DRAFT = 'DRAFT',
  PENDENT = 'PENDENT',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export interface StatusState {
  value: string;
  pendent(invite: InviteAggregate): void;
  accept(invite: InviteAggregate): void;
  reject(invite: InviteAggregate): void;
  expire(invite: InviteAggregate): void;
  revoke(invite: InviteAggregate): void;
}

export abstract class AbstractStatusState implements StatusState {
  value: string;

  pendent(invite: InviteAggregate): void {
    throw new Error(
      `Cannot pendent invite with status equal ${invite.values.status}`,
    );
  }
  accept(invite: InviteAggregate): void {
    throw new Error(
      `Cannot accept invite with status equal ${invite.values.status}`,
    );
  }
  reject(invite: InviteAggregate): void {
    throw new Error(
      `Cannot reject invite with status equal ${invite.values.status}`,
    );
  }
  expire(invite: InviteAggregate): void {
    throw new Error(
      `Cannot expire invite with status equal ${invite.values.status}`,
    );
  }
  revoke(invite: InviteAggregate): void {
    throw new Error(
      `Cannot revoke invite with status equal ${invite.values.status}`,
    );
  }
}
