import { AbstractStatusState, InviteStatusEnum } from './status.state';

export class ExpiredStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = InviteStatusEnum.EXPIRED;
  }
}
