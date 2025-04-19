import { Test, TestingModule } from '@nestjs/testing';
import { CreateCelebrationCommandHandler } from './create-celebration.command.handler';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import { CreateCelebrationCommand } from '../create-celebration.command';
import { CelebrationAggregateBuilder } from '../../../domain/celebration/celebration.aggregate.builder';
import { CelebrationAggregate } from '../../../domain/celebration/celebration.aggregate';

describe('CreateCelebrationCommandHandler integration tests', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CreateCelebrationCommandHandler, CelebrationMemoryRepository],
    }).compile();
    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it('SHOULD call repository', async () => {
    const commandBus = module.get(CommandBus);
    const repository = module.get(CelebrationMemoryRepository);
    const spyRepository = jest.spyOn(repository, 'save');
    const { address, date, description, title } =
      new CelebrationAggregateBuilder().build().values;
    const command = new CreateCelebrationCommand(
      title,
      description,
      date,
      address.zipCode,
      address.street,
      address.number,
    );
    await commandBus.execute(command);
    expect(spyRepository).toHaveBeenCalledTimes(1);
  });

  it('SHOULD save celebration on repository', async () => {
    const commandBus = module.get(CommandBus);
    const repository = module.get(CelebrationMemoryRepository);
    const celebration = new CelebrationAggregateBuilder().build();
    const { address, date, description, title } = celebration.values;
    const command = new CreateCelebrationCommand(
      title,
      description,
      date,
      address.zipCode,
      address.street,
      address.number,
    );
    const id = await commandBus.execute(command);
    const result = await repository.findById(id);
    expect(result.values).toEqual({
      ...celebration.values,
      id,
      status: 'DRAFT',
      updatedAt: expect.any(Date),
      createdAt: expect.any(Date),
    });
  });

  describe('WHEN call CreateCelebrationCommand', () => {
    it('SHOULD execute this command handler', async () => {
      const commandBus = module.get(CommandBus);
      const commandHandler = module.get(CreateCelebrationCommandHandler);
      const spyCommandHandler = jest.spyOn(commandHandler, 'execute');
      const { address, date, description, title } =
        new CelebrationAggregateBuilder().build().values;
      const command = new CreateCelebrationCommand(
        title,
        description,
        date,
        address.zipCode,
        address.street,
        address.number,
      );
      await commandBus.execute(command);
      expect(spyCommandHandler).toHaveBeenCalledTimes(1);
    });
  });
});
