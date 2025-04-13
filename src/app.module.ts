import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ModuleExceptionsFilter } from './infra/filter/module-exception.filter';
import { HostModule } from './host/host.module';

@Module({
  imports: [HostModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ModuleExceptionsFilter,
    },
  ],
})
export class AppModule {}
