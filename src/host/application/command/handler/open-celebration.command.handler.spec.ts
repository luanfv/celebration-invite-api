import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { OpenCelebrationCommandHandler } from './open-celebration.command.handler';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import { CelebrationAggregateBuilder } from '../../../domain/celebration/celebration.aggregate.builder';
import { OpenCelebrationCommand } from '../open-celebration.command';
import { OpenedStatusState } from '../../../domain/celebration/state';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('OpenCelebrationCommandHandler integration tests', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [OpenCelebrationCommandHandler, CelebrationMemoryRepository],
    }).compile();
    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it('SHOULD call CelebrationRepository to update', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    const celebrationRepository = module.get(CelebrationMemoryRepository);
    const celebration = new CelebrationAggregateBuilder().build();
    await celebrationRepository.save(celebration);
    const commandBus = module.get(CommandBus);
    const command = new OpenCelebrationCommand(celebration.values.id);
    const spyCelebrationRepository = jest.spyOn(
      celebrationRepository,
      'updateById',
    );
    const expectedResult = Object.assign(celebration, {});
    expectedResult.status = new OpenedStatusState();
    await commandBus.execute(command);
    expect(spyCelebrationRepository).toHaveBeenCalledWith(
      expectedResult.values.id,
      expectedResult,
    );
  });

  describe('WHEN not found celebration', () => {
    it('SHOULD throw an exception', async () => {
      const commandBus = module.get(CommandBus);
      const command = new OpenCelebrationCommand('any-id');
      await expect(commandBus.execute(command)).rejects.toThrow(
        new NotFoundException('Celebration not found'),
      );
    });
  });

  describe('WHEN cannot change the celebration status', () => {
    it('SHOULD throw an exception', async () => {
      const celebrationRepository = module.get(CelebrationMemoryRepository);
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(new OpenedStatusState())
        .build();
      await celebrationRepository.save(celebration);
      const commandBus = module.get(CommandBus);
      const command = new OpenCelebrationCommand(celebration.values.id);
      await expect(commandBus.execute(command)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });
  });
});
