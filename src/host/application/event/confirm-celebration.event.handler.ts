import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ConfirmCelebrationEvent } from '../../domain/celebration/event/confirm-celebration.event';

@EventsHandler(ConfirmCelebrationEvent)
export class ConfirmCelebrationEventHandler
  implements IEventHandler<ConfirmCelebrationEvent>
{
  handle() {
    // send message
  }
}
