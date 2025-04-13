import { CelebrationAggregate } from './../celebration.aggregate';

export enum CelebrationStatusEnum {
  OPENED = 'OPENED',
  CONFIRMED = 'CONFIRMED',
  CLOSED = 'CLOSED',
  ABANDONED = 'ABANDONED',
}

export interface StatusState {
  value: string;
  abandon(celebration: CelebrationAggregate): void;
  close(celebration: CelebrationAggregate): void;
  confirm(celebration: CelebrationAggregate): void;
}

export abstract class AbstractStatusState implements StatusState {
  abandon(celebration: CelebrationAggregate): void {
    throw new Error(
      `Cannot abandon celebration with status equal ${celebration.values.status}`,
    );
  }

  close(celebration: CelebrationAggregate): void {
    throw new Error(
      `Cannot close celebration with status equal ${celebration.values.status}`,
    );
  }
  value: string;

  confirm(celebration: CelebrationAggregate): void {
    throw new Error(
      `Cannot confirm celebration with status equal ${celebration.values.status}`,
    );
  }
}
