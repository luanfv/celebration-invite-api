import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInviteCommand } from '../create-invite.command';

@CommandHandler(CreateInviteCommand)
export class CreateInviteCommandHandler
  implements ICommandHandler<CreateInviteCommand>
{
  execute(command: CreateInviteCommand): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
