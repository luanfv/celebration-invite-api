import { Module } from '@nestjs/common';
import { InviteController } from './infra/api/invite.controller';
import { CreateInviteCommandHandler } from './application/command/handler/create-invite.command.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CelebrationMemoryRepository } from './infra/repository/celebration-memory.repository';
import { InviteMemoryRepository } from './infra/repository/invite-memory.repository';

@Module({
  imports: [CqrsModule],
  controllers: [InviteController],
  providers: [
    CreateInviteCommandHandler,
    CelebrationMemoryRepository,
    InviteMemoryRepository,
  ],
})
export class InviteModule {}
