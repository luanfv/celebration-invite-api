import { Module } from '@nestjs/common';
import { CelebrationController } from './infra/api/celebration.controller';

@Module({
  controllers: [CelebrationController],
})
export class CelebrationModule {}
