import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateInviteCommandHandler } from './create-invite.command.handler';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import { InviteMemoryRepository } from '../../../infra/data/repository/invite-memory.repository';
import { GuestMemoryRepository } from '../../../infra/data/repository/guest-memory.repository';
import { CreateInviteCommand } from '../create-invite.command';
import { randomUUID } from 'node:crypto';
import { NotFoundException } from '@nestjs/common';
import { CelebrationAggregateBuilder } from '../../../domain/celebration.aggregate.builder';

describe('CreateInviteCommandHandler integration tests', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateInviteCommandHandler,
        CelebrationMemoryRepository,
        InviteMemoryRepository,
        GuestMemoryRepository,
      ],
    }).compile();
    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it('SHOULD call InviteRepository to save', async () => {
    const inviteRepository = module.get(InviteMemoryRepository);
    const spyInviteRepository = jest.spyOn(inviteRepository, 'save');
    const celebrationRepository = module.get(CelebrationMemoryRepository);
    const celebration = new CelebrationAggregateBuilder().build();
    await celebrationRepository.save(celebration);
    const commandBus = module.get(CommandBus);
    const command = new CreateInviteCommand(celebration.values.id, 'John');
    await commandBus.execute(command);
    expect(spyInviteRepository).toHaveBeenCalledTimes(1);
  });

  it('SHOULD call GuestRepository to save', async () => {
    const guestRepository = module.get(GuestMemoryRepository);
    const spyGuestRepository = jest.spyOn(guestRepository, 'save');
    const celebrationRepository = module.get(CelebrationMemoryRepository);
    const celebration = new CelebrationAggregateBuilder().build();
    await celebrationRepository.save(celebration);
    const commandBus = module.get(CommandBus);
    const command = new CreateInviteCommand(celebration.values.id, 'John');
    await commandBus.execute(command);
    expect(spyGuestRepository).toHaveBeenCalledTimes(1);
  });

  describe('WHEN not found the celebration', () => {
    it('SHOULD throw an exception', async () => {
      const commandBus = module.get(CommandBus);
      const command = new CreateInviteCommand(randomUUID(), 'John');
      await expect(commandBus.execute(command)).rejects.toThrow(
        new NotFoundException('Celebration not found'),
      );
    });
  });

  describe('WHEN call CreateInviteCommand', () => {
    it('SHOULD execute this command handler', async () => {
      const commandBus = module.get(CommandBus);
      const commandHandler = module.get(CreateInviteCommandHandler);
      const spyCommandHandler = jest.spyOn(commandHandler, 'execute');
      const { address, date, description, title } =
        new CelebrationAggregateBuilder().build().values;
      const command = new CreateInviteCommand(randomUUID(), 'John');
      await commandBus.execute(command).catch(() => {});
      expect(spyCommandHandler).toHaveBeenCalledTimes(1);
    });
  });
});
