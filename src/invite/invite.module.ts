import { Module } from '@nestjs/common';
import { InviteController } from './infra/api/invite.controller';
import { CreateInviteCommandHandler } from './application/command/handler/create-invite.command.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [InviteController],
  providers: [CreateInviteCommandHandler],
})
export class InviteModule {}
