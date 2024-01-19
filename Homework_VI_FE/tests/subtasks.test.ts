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

describe('Subtasks controller', () => {
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
  describe('GET /subtasks', () => {
    it('responds with status code 200 and list of subtasks', async () => {
      const response = await request(app).get('/subtasks').set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('subtasks');
    });
    it('responds with status code 200 and specific subtask', async () => {
      const response = await request(app).get('/subtasks/2').set('Authorization', `Bearer ${userToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('subtask');
    });
    it('responds with status code 403 and specific subtask', async () => {
      const response = await request(app).get('/subtasks/1').set('Authorization', `Bearer ${userToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('subtask');
    });
  });
  describe('POST /subtasks', () => {
    it('responds with status code 400 and message forbidden', async () => {
      console.log('Test starting...');
      const response = await request(app)
        .post('/subtasks')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Test subtask',
          description: 'Test subtask description',
          taskId: 1,
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body.success).to.equal(true);
      expect(response.body).to.have.property('message');
      expect(response.body).deep.equal({
        success: false,
        message: 'Forbidden',
      });
    });
    it('responds with status code 400 and message', async () => {
      const response = await request(app)
        .post('/subtasks')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'Test',
        });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body.success).to.equal(false);
    });
  });
});