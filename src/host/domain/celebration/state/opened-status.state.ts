import { CelebrationAggregate } from '../celebration.aggregate';
import { AbandonedStatusState } from './abandoned-status.state';
import { ConfirmedStatusState } from './confirmed-status.state';
import { AbstractStatusState, CelebrationStatusEnum } from './status.state';

export class OpenedStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = CelebrationStatusEnum.OPENED;
  }

  confirm(celebration: CelebrationAggregate): void {
    celebration.status = new ConfirmedStatusState();
  }

  abandon(celebration: CelebrationAggregate): void {
    celebration.status = new AbandonedStatusState();
  }
}
