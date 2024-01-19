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

describe('Categories controller', () => {
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
    it('responds with status code 200 and list of categories', async () => {
      const response = await request(app).get('/categories').set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('categories');
    });
    it('responds with status code 200 and specific category', async () => {
      const response = await request(app).get('/categories/1').set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('category');
    });
  });
  describe('POST /categories', () => {
    it('responds with status code 200 and message', async () => {
      console.log('Test starting...');
      const response = await request(app)
        .post('/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test',
          description: 'Test'
        });
      console.log('Response received:', response.statusCode);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('message');
    });
    it('responds with status code 400 and message', async () => {
      const response = await request(app)
        .post('/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'Test'
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body.success).to.equal(false);
      expect(response.body).to.have.property('message');
    });
  });
});