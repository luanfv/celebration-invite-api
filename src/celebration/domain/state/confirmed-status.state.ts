import { CelebrationAggregate } from '../celebration.aggregate';
import { AbandonedStatusState } from './abandoned-status.state';
import { ClosedStatusState } from './closed-status.state';
import { AbstractStatusState, CelebrationStatusEnum } from './status.state';

export class ConfirmedStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = CelebrationStatusEnum.CONFIRMED;
  }

  abandon(celebration: CelebrationAggregate): void {
    celebration.status = new AbandonedStatusState();
  }

  close(celebration: CelebrationAggregate): void {
    celebration.status = new ClosedStatusState();
  }
}
