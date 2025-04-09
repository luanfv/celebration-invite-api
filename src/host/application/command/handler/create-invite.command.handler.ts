import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Inject,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateInviteCommand } from '../create-invite.command';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import { CelebrationRepository } from '../../repository/celebration.repository';
import { InviteAggregate } from '../../../domain/invite.aggregate';
import { InviteRepository } from '../../repository/invite.repository';
import { InviteMemoryRepository } from '../../../infra/data/repository/invite-memory.repository';
import { GuestRepository } from '../../repository/guest.repository';
import { GuestMemoryRepository } from '../../../infra/data/repository/guest-memory.repository';
import { CelebrationAggregate } from 'src/host/domain/celebration.aggregate';

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
    const invite = this.generateInvite(guestName, celebration);
    await this.inviteRepository.save(invite);
    await this.guestRepository.save(invite.guest);
    return invite.values.id;
  }

  private generateInvite(guestName: string, celebration: CelebrationAggregate) {
    try {
      const invite = InviteAggregate.create({ guestName }, celebration);
      return invite;
    } catch (err) {
      throw new UnprocessableEntityException(err?.message);
    }
  }
}
