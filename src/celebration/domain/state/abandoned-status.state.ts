import { AbstractStatusState, CelebrationStatusEnum } from './status.state';

export class AbandonedStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = CelebrationStatusEnum.ABANDONED;
  }
}
