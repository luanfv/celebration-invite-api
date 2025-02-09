import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCelebrationCommand } from '../create-celebration.command';
import { CelebrationAggregate } from 'src/celebration/domain/celebration.aggregate';

@CommandHandler(CreateCelebrationCommand)
export class CreateCelebrationCommandHandler
  implements ICommandHandler<CreateCelebrationCommand>
{
  async execute(command: CreateCelebrationCommand): Promise<string> {
    const {
      addressNumber,
      addressStreet,
      addressZipCode,
      date,
      description,
      title,
    } = command;
    const celebration = CelebrationAggregate.create({
      addressNumber,
      addressStreet,
      addressZipCode,
      date,
      description,
      title,
    });
    return celebration.values.id;
  }
}
