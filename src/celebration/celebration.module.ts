import { Module } from '@nestjs/common';
import { CelebrationController } from './infra/api/celebration.controller';
import { CelebrationRepository } from './infra/data/repositories/celebration.repository';
import { CreateCelebrationCommandHandler } from './application/commands/handlers/create-celebration.command.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule],
  controllers: [CelebrationController],
  providers: [CelebrationRepository, CreateCelebrationCommandHandler],
})
export class CelebrationModule {}
