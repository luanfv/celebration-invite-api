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

  async execute(command: ConfirmCelebrationCommand): Promise<void> {
    const celebration = this.publisher.mergeObjectContext(
      await this.celebrationRepository.findById(command.id),
    );
    if (!celebration) throw new NotFoundException('Celebration not found');
    celebration.changeToConfirmed();
    await this.celebrationRepository.save(celebration);
    celebration.commit();
  }
}
