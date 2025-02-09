import { Test, TestingModule } from '@nestjs/testing';
import { CelebrationModule } from '../../celebration.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateCelebrationDto } from './dto/create-celebration.dto';
import { faker } from '@faker-js/faker/.';

describe('CelebrationController integration tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CelebrationModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST', () => {
    it('SHOULD return status code 201', async () => {
      const body: CreateCelebrationDto = {
        date: new Date(),
        description: faker.lorem.words(10),
        title: faker.lorem.words(2),
        address: {
          number: 1,
          street: faker.location.street(),
          zipCode: faker.location.zipCode('########'),
        },
      };
      await request(app.getHttpServer())
        .post('/celebration')
        .send(body)
        .expect(HttpStatus.CREATED);
    });
  });
});
