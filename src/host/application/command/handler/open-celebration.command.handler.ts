import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OpenCelebrationCommand } from '../open-celebration.command';
import { CelebrationRepository } from '../../repository/celebration.repository';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import {
  Inject,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

@CommandHandler(OpenCelebrationCommand)
export class OpenCelebrationCommandHandler
  implements ICommandHandler<OpenCelebrationCommand>
{
  constructor(
    @Inject(CelebrationMemoryRepository)
    private readonly celebrationRepository: CelebrationRepository,
  ) {}

  async execute(command: OpenCelebrationCommand): Promise<void> {
    const celebration = await this.celebrationRepository.findById(
      command.celebrationId,
    );
    if (!celebration) throw new NotFoundException('Celebration not found');
    try {
      celebration.changeToOpened();
      await this.celebrationRepository.save(celebration);
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }
}
