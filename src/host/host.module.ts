import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CelebrationController } from './infra/api/celebration.controller';
import { CelebrationMemoryRepository } from './infra/data/repository/celebration-memory.repository';
import { CreateCelebrationCommandHandler } from './application/command/handler/create-celebration.command.handler';
import { ConfirmCelebrationCommandHandler } from './application/command/handler/confirm-celebration.command.handler';
import { ConfirmCelebrationEventHandler } from './application/event/confirm-celebration.event.handler';
import { CreateInviteCommandHandler } from './application/command/handler/create-invite.command.handler';
import { GuestMemoryRepository } from './infra/data/repository/guest-memory.repository';
import { InviteMemoryRepository } from './infra/data/repository/invite-memory.repository';

@Module({
  imports: [CqrsModule],
  controllers: [CelebrationController],
  providers: [
    CelebrationMemoryRepository,
    InviteMemoryRepository,
    GuestMemoryRepository,
    CreateCelebrationCommandHandler,
    ConfirmCelebrationCommandHandler,
    CreateInviteCommandHandler,
    ConfirmCelebrationEventHandler,
  ],
})
export class HostModule {}
