import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CelebrationModule } from './celebration/celebration.module';

@Module({
  imports: [CelebrationModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
