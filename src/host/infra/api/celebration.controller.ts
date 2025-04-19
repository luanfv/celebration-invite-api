import { OpenCelebrationCommand } from '../../application/command/open-celebration.command';
import { Post, Controller, Body, Patch, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCelebrationCommand } from '../../application/command/create-celebration.command';
import { CreateCelebrationDto } from './dto/create-celebration.dto';
import { ConfirmCelebrationParamDto } from './dto/confirm-celebration.dto';
import { ConfirmCelebrationCommand } from '../../application/command/confirm-celebration.command';
import { OpenCelebrationParamDto } from './dto/open-celebration.dto';

@Controller('/celebration')
export class CelebrationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(
    @Body() { address, date, description, title }: CreateCelebrationDto,
  ) {
    const command = new CreateCelebrationCommand(
      title,
      description,
      date,
      address.zipCode,
      address.street,
      address.number,
    );
    const id = await this.commandBus.execute(command);
    return {
      id,
    };
  }

  @Patch('/:celebrationId/open')
  async open(@Param() { celebrationId }: OpenCelebrationParamDto) {
    const command = new OpenCelebrationCommand(celebrationId);
    await this.commandBus.execute(command);
  }

  @Patch('/:celebrationId/confirm')
  async confirm(@Param() { celebrationId }: ConfirmCelebrationParamDto) {
    const command = new ConfirmCelebrationCommand(celebrationId);
    await this.commandBus.execute(command);
  }
}
