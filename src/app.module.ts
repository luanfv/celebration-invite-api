import { Module } from '@nestjs/common';
import { CelebrationModule } from './celebration/celebration.module';
import { InviteModule } from './invite/invite.module';
import { APP_FILTER } from '@nestjs/core';
import { ModuleExceptionsFilter } from './infra/filter/module-exception.filter';

@Module({
  imports: [CelebrationModule, InviteModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ModuleExceptionsFilter,
    },
  ],
})
export class AppModule {}
