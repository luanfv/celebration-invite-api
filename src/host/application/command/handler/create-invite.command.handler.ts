import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Inject,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateInviteCommand } from '../create-invite.command';
import { CelebrationMemoryRepository } from '../../../infra/data/repository/celebration-memory.repository';
import { CelebrationRepository } from '../../repository/celebration.repository';
import { InviteAggregate } from '../../../domain/invite/invite.aggregate';
import { InviteRepository } from '../../repository/invite.repository';
import { InviteMemoryRepository } from '../../../infra/data/repository/invite-memory.repository';
import { GuestRepository } from '../../repository/guest.repository';
import { GuestMemoryRepository } from '../../../infra/data/repository/guest-memory.repository';
import { CelebrationAggregate } from '../../../domain/celebration/celebration.aggregate';
import { GuestEntity } from '../../../domain/guest/guest.entity';

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
    const { invite, guest } = this.generateInviteAndGuest(
      guestName,
      celebration,
    );
    await this.inviteRepository.save(invite);
    await this.guestRepository.save(guest);
    return invite.values.id;
  }

  private generateInviteAndGuest(
    guestName: string,
    celebration: CelebrationAggregate,
  ): {
    invite: InviteAggregate;
    guest: GuestEntity;
  } {
    try {
      const invite = InviteAggregate.create(celebration);
      const guest = GuestEntity.create(guestName, invite);
      return { invite, guest };
    } catch (err) {
      throw new UnprocessableEntityException(err?.message);
    }
  }
}
