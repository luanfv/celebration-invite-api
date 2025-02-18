import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateInviteCommandHandler } from './create-invite.command.handler';
import { CelebrationMemoryRepository } from '../../../infra/repository/celebration-memory.repository';
import { InviteMemoryRepository } from '../../../infra/repository/invite-memory.repository';
import { CreateInviteCommand } from '../create-invite.command';
import { randomUUID } from 'node:crypto';

describe('CreateInviteCommandHandler integration tests', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateInviteCommandHandler,
        CelebrationMemoryRepository,
        InviteMemoryRepository,
      ],
    }).compile();
    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it('SHOULD check if celebration id exists', async () => {
    const commandBus = module.get(CommandBus);
    const celebrationRepository = module.get(CelebrationMemoryRepository);
    const spyOnCelebrationRepository = jest.spyOn(
      celebrationRepository,
      'isExists',
    );
    const command = new CreateInviteCommand(randomUUID(), [], 1, new Date());
    await commandBus.execute(command);
    expect(spyOnCelebrationRepository).toHaveBeenCalledTimes(1);
  });

  it('SHOULD save invite', async () => {
    const commandBus = module.get(CommandBus);
    const inviteRepository = module.get(InviteMemoryRepository);
    const spyOnInviteRepository = jest.spyOn(inviteRepository, 'create');
    const command = new CreateInviteCommand(randomUUID(), [], 1, new Date());
    await commandBus.execute(command);
    expect(spyOnInviteRepository).toHaveBeenCalledTimes(1);
  });

  it('SHOULD return the invite id', async () => {
    const commandBus = module.get(CommandBus);
    const command = new CreateInviteCommand(randomUUID(), [], 1, new Date());
    await expect(commandBus.execute(command)).resolves.toEqual(
      expect.any(String),
    );
  });

  describe('WHEN celebration do not exists', () => {
    it('SHOULD throw an error: Celebration do not exists', async () => {
      const commandBus = module.get(CommandBus);
      const celebrationRepository = module.get(CelebrationMemoryRepository);
      jest
        .spyOn(celebrationRepository, 'isExists')
        .mockResolvedValueOnce(false);
      const command = new CreateInviteCommand(randomUUID(), [], 1, new Date());
      await expect(commandBus.execute(command)).rejects.toEqual(
        new Error('Celebration do not exists'),
      );
    });
  });

  describe('WHEN call CreateInviteCommand', () => {
    it('SHOULD execute this command handler', async () => {
      const commandBus = module.get(CommandBus);
      const commandHandler = module.get(CreateInviteCommandHandler);
      const command = new CreateInviteCommand(randomUUID(), [], 1, new Date());
      const spyCommandHandler = jest.spyOn(commandHandler, 'execute');
      await commandBus.execute(command);
      expect(spyCommandHandler).toHaveBeenCalledTimes(1);
    });
  });
});
