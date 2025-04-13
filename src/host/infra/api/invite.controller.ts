import { Body, Controller, Injectable, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateInviteCommand } from '../../application/command/create-invite.command';
import { CreateInviteDto, CreateInviteParamDto } from './dto/create-invite.dto';

@Controller('/celebration')
export class InviteController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/:celebrationId/invite')
  async createInvite(
    @Param() { celebrationId }: CreateInviteParamDto,
    @Body() { guestName }: CreateInviteDto,
  ) {
    const command = new CreateInviteCommand(celebrationId, guestName);
    const id = await this.commandBus.execute(command);
    return { id };
  }
}
