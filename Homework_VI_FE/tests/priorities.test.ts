import request from 'supertest';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';

const adminUser = {
  email: 'manni.maasikas@oppime.ee',
  password: 'maasikas',
};

const user = {
  email: 'testing@tester.ee',
  password: 'TugevTest',
};

let adminToken: string;
let userToken: string;

describe('Priorities controller', () => {
  describe('POST /login', () => {
    it('responds with status code 200 and admin token', async () => {
      const response = await request(app).post('/login').send(adminUser);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
      adminToken = response.body.token;
    });
    it('responds with status code 200 and user token', async () => {
      const response = await request(app).post('/login').send(user);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('token');
      expect(response.body.token).to.be.a('string');
      userToken = response.body.token;
    });
  });
  describe('GET /categories', () => {
    it('responds with status code 200 and list of priorities', async () => {
      const response = await request(app).get('/priorities').set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('priorities');
    });
    it('responds with status code 200 and specific priority', async () => {
      const response = await request(app).get('/priorities/1').set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('priority');
    });
  });
});