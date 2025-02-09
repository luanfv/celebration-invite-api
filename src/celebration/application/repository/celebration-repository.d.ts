import { CelebrationAggregate } from '../../domain/celebration.aggregate';

interface CelebrationRepository {
  save(celebration: CelebrationAggregate): Promise<void>;
  findById(id: string): Promise<CelebrationAggregate>;
}
