import { CelebrationAggregate } from '../../domain/celebration.aggregate';

export interface CelebrationRepository {
  save(celebration: CelebrationAggregate): Promise<void>;
  findById(id: string): Promise<CelebrationAggregate>;
}
