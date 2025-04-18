import { CelebrationAggregate } from '../celebration.aggregate';
import { AbandonedStatusState } from './abandoned-status.state';
import { ConfirmedStatusState } from './confirmed-status.state';
import { OpenedStatusState } from './opened-status.state';
import { AbstractStatusState, CelebrationStatusEnum } from './status.state';

export class DraftStatusState extends AbstractStatusState {
  constructor() {
    super();
    this.value = CelebrationStatusEnum.DRAFT;
  }

  open(celebration: CelebrationAggregate): void {
    celebration.status = new OpenedStatusState();
  }

  abandon(celebration: CelebrationAggregate): void {
    celebration.status = new AbandonedStatusState();
  }
}
