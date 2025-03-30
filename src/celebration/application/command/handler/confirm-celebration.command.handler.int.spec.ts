import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { ConfirmCelebrationCommandHandler } from './confirm-celebration.command.handler';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmCelebrationCommand } from '../confirm-celebration.command';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import { CelebrationRepository } from '../../repository/celebration.repository';
import { CelebrationAggregateBuilder } from '../../../domain/celebration.aggregate.builder';
import { randomUUID } from 'node:crypto';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  AbandonedStatusState,
  ClosedStatusState,
  ConfirmedStatusState,
  StatusState,
} from '../../../domain/state';

describe('ConfirmCelebrationCommandHandler integration tests', () => {
  let module: TestingModule;
  const celebrationRepository: CelebrationRepository =
    new CelebrationMemoryRepository();

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        ConfirmCelebrationCommandHandler,
        CelebrationMemoryRepository,
      ],
    })
      .overrideProvider(CelebrationMemoryRepository)
      .useValue(celebrationRepository)
      .compile();

    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it('SHOULD save the celebration with status equal CONFIRMED on the repository', async () => {
    const expectedResult = 'CONFIRMED';
    const commandBus = module.get(CommandBus);
    const repository = module.get<CelebrationRepository>(
      CelebrationMemoryRepository,
    );
    const celebration = new CelebrationAggregateBuilder().build();
    await repository.save(celebration);
    expect(celebration.status).not.toEqual(expectedResult);
    await commandBus.execute(
      new ConfirmCelebrationCommand(celebration.values.id),
    );
    const celebrationFromRepository = await repository.findById(
      celebration.values.id,
    );
    expect(celebrationFromRepository.status).toEqual(expectedResult);
  });

  it('SHOULD return the celebration id', async () => {
    const commandBus = module.get(CommandBus);
    const repository = module.get<CelebrationRepository>(
      CelebrationMemoryRepository,
    );
    const celebration = new CelebrationAggregateBuilder().build();
    await repository.save(celebration);
    await expect(
      commandBus.execute(new ConfirmCelebrationCommand(celebration.values.id)),
    ).resolves.toEqual(celebration.values.id);
  });

  describe('WHEN not found celebration on repository', () => {
    it('SHOULD thrown an exception', async () => {
      const commandBus = module.get(CommandBus);
      await expect(
        commandBus.execute(new ConfirmCelebrationCommand(randomUUID())),
      ).rejects.toThrow(new NotFoundException('Celebration not found'));
    });
  });

  describe('WHEN celebration has not OFFERED status', () => {
    const celebrationStatus: StatusState[] = [
      new ClosedStatusState(),
      new AbandonedStatusState(),
      new ConfirmedStatusState(),
    ];

    it.each(celebrationStatus)('SHOULD thrown an exception', async (status) => {
      const commandBus = module.get(CommandBus);
      const repository = module.get<CelebrationRepository>(
        CelebrationMemoryRepository,
      );
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      await repository.save(celebration);
      await expect(
        commandBus.execute(
          new ConfirmCelebrationCommand(celebration.values.id),
        ),
      ).rejects.toEqual(
        new UnprocessableEntityException(
          `Cannot confirm celebration with status equal ${status.value}`,
        ),
      );
    });
  });

  describe('WHEN call ConfirmCelebrationCommand', () => {
    it('SHOULD execute this command handler', async () => {
      const commandBus = module.get(CommandBus);
      const commandHandler = module.get(ConfirmCelebrationCommandHandler);
      const spyCommandHandler = jest.spyOn(commandHandler, 'execute');
      await commandBus
        .execute(new ConfirmCelebrationCommand(randomUUID()))
        .catch(() => {});
      expect(spyCommandHandler).toHaveBeenCalledTimes(1);
    });
  });
});
