import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ConfirmCelebrationCommand } from '../confirm-celebration.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import { CelebrationRepository } from '../../repository/celebration.repository';

@CommandHandler(ConfirmCelebrationCommand)
export class ConfirmCelebrationCommandHandler
  implements ICommandHandler<ConfirmCelebrationCommand>
{
  constructor(
    @Inject(CelebrationMemoryRepository)
    private readonly celebrationRepository: CelebrationRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: ConfirmCelebrationCommand): Promise<string> {
    const celebrationFromRepository = await this.celebrationRepository.findById(
      command.id,
    );
    if (!celebrationFromRepository)
      throw new NotFoundException('Celebration not found');
    const celebration = this.publisher.mergeObjectContext(
      celebrationFromRepository,
    );
    celebration.changeToConfirmed();
    await this.celebrationRepository.updateById(
      celebration.values.id,
      celebration,
    );
    celebration.commit();
    return celebration.values.id;
  }
}
