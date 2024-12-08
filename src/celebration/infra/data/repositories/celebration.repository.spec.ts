import { Test, TestingModule } from '@nestjs/testing';
import { CelebrationRepository } from './celebration.repository';
import { CelebrationAggregateBuilder } from '../../../domain/celebration.aggregate.builder';

describe('CelebrationRepository integration tests', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [CelebrationRepository],
    }).compile();
  });

  afterAll(async () => {
    module.close();
  });

  it('SHOULD save the celebration in the repository', () => {
    const repository = module.get(CelebrationRepository);
    const celebration = new CelebrationAggregateBuilder().build();
    repository.save(celebration);
    const celebrationFromRepository = repository.findById(
      celebration.values.id,
    );
    expect(celebrationFromRepository.values).toEqual(celebration.values);
  });
});
