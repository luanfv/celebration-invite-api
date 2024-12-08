import { Post, Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCelebrationCommand } from 'src/celebration/application/commands/create-celebration.command';

@Controller('/celebration')
export class CelebrationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create() {
    const command = new CreateCelebrationCommand('', '', new Date(), '', '', 1);
    const id = await this.commandBus.execute(command);
    return {
      id,
    };
  }
}
