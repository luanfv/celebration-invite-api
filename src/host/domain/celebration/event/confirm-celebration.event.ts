import { CelebrationAggregate } from '../celebration.aggregate';

export class ConfirmCelebrationEvent {
  constructor(readonly celebration: CelebrationAggregate) {}
}
