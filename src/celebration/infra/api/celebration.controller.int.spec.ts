import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateCelebrationDto } from './dto/create-celebration.dto';
import { faker } from '@faker-js/faker/.';
import { AppModule } from '../../../app.module';

describe('CelebrationController integration tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
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

    describe('WHEN has an exception', () => {
      it('SHOULD return formatted', async () => {
        const response = await request(app.getHttpServer())
          .post('/celebration')
          .send({});

        expect(response.body).toEqual({
          statusCode: expect.any(Number),
          timestamp: expect.any(String),
          path: expect.any(String),
          message: [expect.any(String)],
        });
      });
    });

    describe('WHEN has the invalid data', () => {
      it('SHOULD return status code 406', async () => {
        const body: CreateCelebrationDto = {
          date: new Date(),
          description: faker.lorem.words(10),
          title: faker.lorem.words(2),
          address: {
            number: 1,
            street: faker.location.street(),
            zipCode: faker.location.zipCode('######'),
          },
        };
        await request(app.getHttpServer())
          .post('/celebration')
          .send(body)
          .expect(HttpStatus.NOT_ACCEPTABLE);
      });
    });
  });
});
