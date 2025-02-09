import { Post, Controller, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCelebrationCommand } from 'src/celebration/application/commands/create-celebration.command';
import { CreateCelebrationDto } from './dto/create-celebration.dto';

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
}
