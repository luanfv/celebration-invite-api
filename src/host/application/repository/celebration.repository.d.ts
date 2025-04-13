import { CelebrationAggregate } from '../../domain/celebration/celebration.aggregate';

export interface CelebrationRepository {
  save(celebration: CelebrationAggregate): Promise<CelebrationAggregate>;
  updateById(
    id: string,
    celebration: CelebrationAggregate,
  ): Promise<CelebrationAggregate>;
  findById(id: string): Promise<CelebrationAggregate>;
}
