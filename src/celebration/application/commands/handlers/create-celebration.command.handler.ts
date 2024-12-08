import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCelebrationCommand } from '../create-celebration.command';

@CommandHandler(CreateCelebrationCommand)
export class CreateCelebrationCommandHandler
  implements ICommandHandler<CreateCelebrationCommand>
{
  async execute(command: CreateCelebrationCommand): Promise<string> {
    return 'hello world!';
  }
}
