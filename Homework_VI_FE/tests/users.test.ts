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

const wrongEmail = { 
  email: 'tere@tere.ee',
  password: 'TugevTest',
};

const wrongPw = { 
  email: 'testing@tester.ee',
  password: 'TugevTest2',
};

const noPw = {
  email: 'testing@tester.ee',
};

let adminToken: string;
let userToken: string;

describe('Users controller', () => {
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
    it('responds with status code 404 and error message because user is not logged in', async () => {
      const response = await request(app).post('/login').send(wrongEmail);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(404);
      expect(response.body).deep.equal({
        success: false,
        message: 'User not found',
      });
    });
    it('responds with status code 400 and error message because user is not logged in', async () => {
      const response = await request(app).post('/login').send(wrongPw);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).deep.equal({
        success: false,
        message: 'Wrong password',
      });
    });
    it('responds with status code 400 and error message because user is not logged in', async () => {
      const response = await request(app).post('/login').send(noPw);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(400);
      expect(response.body).deep.equal({
        success: false,
        message: 'Check if email or password are provided',
      });
    });
  });
  describe('GET /users', () => {
    it('responds with status code 401 and error message because user is not logged in', async () => {
      const response = await request(app).get('/users');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).deep.equal({
        success: false,
        message: 'No token provided',
      });
    });
    it('responds with status code 401 and error message because invalid token', async () => {
      const response = await request(app).get('/users').set('Authorization', 'Bearer invalidToken');
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(401);
      expect(response.body).deep.equal({
        success: false,
        message: 'Invalid token',
      });
    });
    it('responds with status code 200 and list of users', async () => {
      const response = await request(app).get('/users').set('Authorization', `Bearer ${adminToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).equal(true);
      expect(response.body).to.have.property('users');
      expect(response.body.countOfUsers).to.equal(3);
      expect(response.body.message).to.equal('List of users');
    });
    it('responds with status code 403 and list of users', async () => {
      const response = await request(app).get('/users').set('Authorization', `Bearer ${userToken}`);
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(403);
      expect(response.body).deep.equal({
        success: false,
        message: 'Forbidden',
      });
    });
  });
  describe('POST /users', () => {
    it('responds with status code 401 and error message because user is not logged in', async () => {
      const response = await request(app).post('/users').send({
        firstName: 'Test',
        lastName: 'Testington', 
        email: 'tester@tester.ee',
        password: 'testington',
      });
      expect(response.body).to.be.a('object');
      expect(response.statusCode).to.equal(200);
      expect(response.body.success).to.equal(true);
    });
  });
});