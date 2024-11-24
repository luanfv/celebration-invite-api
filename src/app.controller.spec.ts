import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';

describe('AppController', () => {
  it('SHOULD be controller defined', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const controller = module.get(AppController);
    expect(controller).toBeDefined();
  });
});
