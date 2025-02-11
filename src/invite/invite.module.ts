import { Module } from '@nestjs/common';
import { InviteController } from './infra/api/invite.controller';

@Module({
  controllers: [InviteController],
})
export class InviteModule {}
