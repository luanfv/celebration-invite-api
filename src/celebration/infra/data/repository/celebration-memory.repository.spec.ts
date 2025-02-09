import { Test, TestingModule } from '@nestjs/testing';
import { CelebrationMemoryRepository } from './celebration-memory.repository';
import { CelebrationAggregateBuilder } from '../../../domain/celebration.aggregate.builder';

describe('CelebrationMemoryRepository integration tests', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [CelebrationMemoryRepository],
    }).compile();
  });

  afterAll(async () => {
    module.close();
  });

  it('SHOULD save the celebration in the repository', async () => {
    const repository = module.get(CelebrationMemoryRepository);
    const celebration = new CelebrationAggregateBuilder().build();
    repository.save(celebration);
    const celebrationFromRepository = await repository.findById(
      celebration.values.id,
    );
    expect(celebrationFromRepository.values).toEqual(celebration.values);
  });
});
