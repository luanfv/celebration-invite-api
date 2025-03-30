import { Module } from '@nestjs/common';
import { CelebrationMemoryRepository } from './infra/data/repository/celebration-memory.repository';
import { CelebrationController } from './infra/api/celebration.controller';
import { CreateCelebrationCommandHandler } from './application/command/handler/create-celebration.command.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfirmCelebrationEventHandler } from './application/event/confirm-celebration.event.handler';
import { ConfirmCelebrationCommandHandler } from './application/command/handler/confirm-celebration.command.handler';

@Module({
  imports: [CqrsModule],
  controllers: [CelebrationController],
  providers: [
    CelebrationMemoryRepository,
    CreateCelebrationCommandHandler,
    ConfirmCelebrationCommandHandler,
    ConfirmCelebrationEventHandler,
  ],
})
export class CelebrationModule {}
