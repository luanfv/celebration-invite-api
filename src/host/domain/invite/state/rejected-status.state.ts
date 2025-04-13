import { AbstractStatusState, InviteStatusEnum } from './status.state';

export class RejectedStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = InviteStatusEnum.REJECTED;
  }
}
