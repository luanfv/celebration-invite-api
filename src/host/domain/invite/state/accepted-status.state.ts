import { AbstractStatusState, InviteStatusEnum } from './status.state';

export class AcceptedStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = InviteStatusEnum.ACCEPTED;
  }
}
