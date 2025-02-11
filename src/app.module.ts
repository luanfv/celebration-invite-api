import { Module } from '@nestjs/common';
import { CelebrationModule } from './celebration/celebration.module';
import { InviteModule } from './invite/invite.module';

@Module({
  imports: [CelebrationModule, InviteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
