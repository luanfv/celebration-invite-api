import { Module } from '@nestjs/common';
import { CelebrationController } from './infra/api/celebration.controller';
import { CelebrationRepository } from './infra/data/repositories/celebration.repository';

@Module({
  controllers: [CelebrationController],
  providers: [CelebrationRepository],
})
export class CelebrationModule {}
