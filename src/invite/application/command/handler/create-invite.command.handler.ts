import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInviteCommand } from '../create-invite.command';
import { InviteAggregate } from '../../../domain/invite.aggregate';
import { CelebrationRepository } from '../../repository/celebration.repository';
import { InviteRepository } from '../../repository/invite.repository';

@CommandHandler(CreateInviteCommand)
export class CreateInviteCommandHandler
  implements ICommandHandler<CreateInviteCommand>
{
  constructor(
    private readonly celebrationRepository: CelebrationRepository,
    private readonly inviteRepository: InviteRepository,
  ) {}

  async execute(command: CreateInviteCommand): Promise<string> {
    const hasCelebration = await this.celebrationRepository.isExists(
      command.celebrationId,
    );
    if (!hasCelebration) throw new Error('Celebration do not exists');
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
