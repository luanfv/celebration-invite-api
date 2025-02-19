import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateInviteBodyDto } from './dto/create-invite.dto';
import { randomUUID } from 'node:crypto';
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
      const body: CreateInviteBodyDto = {
        expireAt: new Date(),
        guests: [],
        maxGuest: 1,
      };
      await request(app.getHttpServer())
        .post(`/celebration/${randomUUID()}/invite`)
        .send(body)
        .expect(HttpStatus.CREATED);
    });

    describe('WHEN has exception', () => {
      it('SHOULD return formatted', async () => {
        const response = await request(app.getHttpServer())
          .post(`/celebration/${randomUUID()}/invite`)
          .send({});

        expect(response.body).toEqual({
          statusCode: expect.any(Number),
          timestamp: expect.any(String),
          path: expect.any(String),
          message: [expect.any(String)],
        });
      });
    });
  });
});
