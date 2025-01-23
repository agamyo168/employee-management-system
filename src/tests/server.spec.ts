import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Healthcheck', () => {
  it('healthcheck', async () => {
    const res = await request.get('/api/v1/healthcheck');
    expect(res.status).toBe(StatusCodes.OK);
  });
});

describe('Testing Not Found Middleware', () => {
  it(`should return ${StatusCodes.NOT_FOUND} when accessing a not handled url`, async () => {
    const res = await request.get('/invalid-url');
    expect(res.status).toBe(StatusCodes.NOT_FOUND);
  });
});
