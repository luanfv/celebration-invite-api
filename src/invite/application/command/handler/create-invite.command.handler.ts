import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInviteCommand } from '../create-invite.command';
import { InviteAggregate } from '../../../domain/invite.aggregate';
import { CelebrationRepository } from '../../repository/celebration.repository';
import { InviteRepository } from '../../repository/invite.repository';
import { CelebrationMemoryRepository } from '../../../infra/repository/celebration-memory.repository';
import { Inject, NotFoundException } from '@nestjs/common';
import { InviteMemoryRepository } from '../../../infra/repository/invite-memory.repository';

@CommandHandler(CreateInviteCommand)
export class CreateInviteCommandHandler
  implements ICommandHandler<CreateInviteCommand>
{
  constructor(
    @Inject(CelebrationMemoryRepository)
    private readonly celebrationRepository: CelebrationRepository,
    @Inject(InviteMemoryRepository)
    private readonly inviteRepository: InviteRepository,
  ) {}

  async execute(command: CreateInviteCommand): Promise<string> {
    const hasCelebration = await this.celebrationRepository.isExists(
      command.celebrationId,
    );
    if (!hasCelebration)
      throw new NotFoundException('Celebration do not exists');
    const invite = InviteAggregate.create({
      celebrationId: command.celebrationId,
      expireAt: command.expireAt,
      guests: command.guests,
      maxGuest: command.maxGuest,
    });
    await this.inviteRepository.create(invite);
    return invite.values.id;
  }
}
