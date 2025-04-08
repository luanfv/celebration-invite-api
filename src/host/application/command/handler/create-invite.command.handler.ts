import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { CreateInviteCommand } from '../create-invite.command';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import { CelebrationRepository } from '../../repository/celebration.repository';
import { InviteAggregate } from '../../../domain/invite.aggregate';
import { InviteRepository } from '../../repository/invite.repository';
import { InviteMemoryRepository } from '../../../infra/data/repository/invite-memory.repository';
import { GuestRepository } from '../../repository/guest.repository';
import { GuestMemoryRepository } from '../../../infra/data/repository/guest-memory.repository';

@CommandHandler(CreateInviteCommand)
export class CreateInviteCommandHandler
  implements ICommandHandler<CreateInviteCommand>
{
  constructor(
    @Inject(CelebrationMemoryRepository)
    private readonly celebrationRepository: CelebrationRepository,
    @Inject(InviteMemoryRepository)
    private readonly inviteRepository: InviteRepository,
    @Inject(GuestMemoryRepository)
    private readonly guestRepository: GuestRepository,
  ) {}

  async execute({
    celebrationId,
    guestName,
  }: CreateInviteCommand): Promise<string> {
    const celebration =
      await this.celebrationRepository.findById(celebrationId);
    if (!celebration) throw new NotFoundException('Celebration not found');
    const invite = InviteAggregate.create({ guestName }, celebration);
    await this.inviteRepository.save(invite);
    await this.guestRepository.save(invite.guest);
    return invite.values.id;
  }
}
