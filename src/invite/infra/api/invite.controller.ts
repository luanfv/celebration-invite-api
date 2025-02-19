import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CreateInviteBodyDto,
  CreateInviteParamsDto,
} from './dto/create-invite.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateInviteCommand } from '../../application/command/create-invite.command';

@Controller()
export class InviteController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/celebration/:celebrationId/invite')
  async create(
    @Param() { celebrationId }: CreateInviteParamsDto,
    @Body() { expireAt, guests, maxGuest }: CreateInviteBodyDto,
  ) {
    const command = new CreateInviteCommand(
      celebrationId,
      guests,
      maxGuest,
      expireAt,
    );
    const id = await this.commandBus.execute(command);
    return { id };
  }
}
