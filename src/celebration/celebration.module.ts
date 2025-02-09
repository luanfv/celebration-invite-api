import { Module } from '@nestjs/common';
import { CelebrationMemoryRepository } from './infra/data/repository/celebration-memory.repository';
import { CelebrationController } from './infra/api/celebration.controller';
import { CreateCelebrationCommandHandler } from './application/command/handler/create-celebration.command.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { ModuleExceptionsFilter } from './infra/filter/module-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [CqrsModule],
  controllers: [CelebrationController],
  providers: [
    CelebrationMemoryRepository,
    CreateCelebrationCommandHandler,
    {
      provide: APP_FILTER,
      useClass: ModuleExceptionsFilter,
    },
  ],
})
export class CelebrationModule {}
