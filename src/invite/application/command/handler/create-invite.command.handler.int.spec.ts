import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateInviteCommandHandler } from './create-invite.command.handler';

describe('CreateInviteCommandHandler integration tests', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [CreateInviteCommandHandler],
    }).compile();
    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  it.todo('SHOULD check if celebration id exists');

  it.todo('SHOULD create invite');

  it.todo('SHOULD save invite');

  describe('WHEN celebration do not exists', () => {
    it.todo('SHOULD throw an error: Celebration do not exists');
  });

  describe('WHEN call CreateInviteCommand', () => {
    it.todo('SHOULD execute this command handler');
  });
});
