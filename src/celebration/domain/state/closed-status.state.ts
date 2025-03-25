import { AbstractStatusState, CelebrationStatusEnum } from './status.state';

export class ClosedStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = CelebrationStatusEnum.CLOSED;
  }
}
