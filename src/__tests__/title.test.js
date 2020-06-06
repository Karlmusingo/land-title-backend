import request from 'supertest';
import app from '../app';
import * as statusCodes from '../constants/statusCodes';
import { urlPrefix } from '../__mocks__/variables';

describe('Tickets', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
  });
  jest.setTimeout(30000);
  describe('create a title', () => {
    test('should create a title successfully', async () => {
      const title = {
        title:"wertyuiu",
	      squareMeter:"60x120",
	      address:"23, ikare street",
	      mortgage:"cleared"
      };
      const res = await request(app)
        .post(`${urlPrefix}/titles`)
        .send(title)
      expect(res.status).toBe(statusCodes.CREATED);
      expect(res.body.status).toBe('success');
      expect(res.body.ticket).toHaveProperty('title');
      expect(res.body.ticket).toHaveProperty('squareMeter');
      expect(res.body.ticket).toHaveProperty('address');
      expect(res.body.ticket).toHaveProperty('mortgage');
    });

    test('should return a `Bad Request`', async () => {
      const title = {
        title: 'title name',
      };
      const res = await request(app)
        .post(`${urlPrefix}/titles`)
        .send(title)
      expect(res.status).toBe(statusCodes.BAD_REQUEST);
      expect(res.body.message).toBe('Bad Request');
    });
  });

});
