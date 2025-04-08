import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CelebrationController } from './infra/api/celebration.controller';
import { CelebrationMemoryRepository } from './infra/data/repository/celebration-memory.repository';
import { CreateCelebrationCommandHandler } from './application/command/handler/create-celebration.command.handler';
import { ConfirmCelebrationCommandHandler } from './application/command/handler/confirm-celebration.command.handler';
import { ConfirmCelebrationEventHandler } from './application/event/confirm-celebration.event.handler';

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
export class HostModule {}
