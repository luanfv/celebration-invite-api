import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmCelebrationEventHandler } from './confirm-celebration.event.handler';
import { CelebrationAggregateBuilder } from '../../domain/celebration/celebration.aggregate.builder';
import { ConfirmCelebrationEvent } from '../../domain/celebration/event/confirm-celebration.event';

describe('ConfirmCelebrationEventHandler integration tests', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [ConfirmCelebrationEventHandler],
    }).compile();
    await module.init();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('WHEN call ConfirmCelebrationEvent', () => {
    it('SHOULD execute this command handler', async () => {
      const celebration = new CelebrationAggregateBuilder().build();
      const event = new ConfirmCelebrationEvent(celebration);
      const eventBus = module.get(EventBus);
      const eventHandler = module.get(ConfirmCelebrationEventHandler);
      const spyEventHandler = jest.spyOn(eventHandler, 'handle');
      eventBus.publish(event);
      expect(spyEventHandler).toHaveBeenCalledTimes(1);
    });
  });
});
