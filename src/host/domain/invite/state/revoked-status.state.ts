import { AbstractStatusState, InviteStatusEnum } from './status.state';

export class RevokedStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = InviteStatusEnum.REVOKED;
  }
}
