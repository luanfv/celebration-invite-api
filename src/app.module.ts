import { Module } from '@nestjs/common';
import { CelebrationModule } from './celebration/celebration.module';

@Module({
  imports: [CelebrationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
