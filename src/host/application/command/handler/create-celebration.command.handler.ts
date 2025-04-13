import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCelebrationCommand } from '../create-celebration.command';
import { CelebrationAggregate } from '../../../domain/celebration/celebration.aggregate';
import { Inject } from '@nestjs/common';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import { CelebrationRepository } from '../../repository/celebration.repository';

@CommandHandler(CreateCelebrationCommand)
export class CreateCelebrationCommandHandler
  implements ICommandHandler<CreateCelebrationCommand>
{
  constructor(
    @Inject(CelebrationMemoryRepository)
    private readonly celebrationRepository: CelebrationRepository,
  ) {}

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
    await this.celebrationRepository.save(celebration);
    return celebration.values.id;
  }
}
