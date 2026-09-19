import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import authRoutes from '../server/routes/authRoutes.js';
import newsRoutes from '../server/routes/newsRoutes.js';
import prefRoutes from '../server/routes/prefRoutes.js';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', newsRoutes);
app.use('/api', prefRoutes);

describe('Comprehensive Backend API Test Suite', () => {
  const testUser = {
    name: 'Karan Patel',
    email: `karan.${Date.now()}@nuzio.ai`,
    password: 'securepassword123'
  };
  let userToken = '';

  describe('Authentication & Signup Flow', () => {
    it('POST /api/auth/signup - Should reject registration with missing name', async () => {
      const res = await request(app).post('/api/auth/signup').send({ email: 'test@nuzio.ai', password: '123' });
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Enter your name');
    });

    it('POST /api/auth/signup - Should reject password under 6 characters', async () => {
      const res = await request(app).post('/api/auth/signup').send({ name: 'Short Pass', email: 'pass@nuzio.ai', password: '123' });
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('at least 6 characters');
    });

    it('POST /api/auth/signup - Should successfully register new user account', async () => {
      const res = await request(app).post('/api/auth/signup').send(testUser);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.name).toBe(testUser.name);
      expect(res.body.user.email).toBe(testUser.email.toLowerCase());
      userToken = res.body.token;
    });

    it('POST /api/auth/signup - Should reject duplicate email registration', async () => {
      const res = await request(app).post('/api/auth/signup').send(testUser);
      expect(res.status).toBe(409);
      expect(res.body.error).toContain('already exists');
    });

    it('POST /api/auth/login - Should fail login with incorrect password', async () => {
      const res = await request(app).post('/api/auth/login').send({ email: testUser.email, password: 'wrongpassword' });
      expect(res.status).toBe(401);
      expect(res.body.error).toContain('does not match');
    });

    it('POST /api/auth/login - Should login successfully with correct credentials', async () => {
      const res = await request(app).post('/api/auth/login').send({ email: testUser.email, password: testUser.password });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(testUser.email.toLowerCase());
    });

    it('POST /api/auth/demo - Should generate instant demo session token', async () => {
      const res = await request(app).post('/api/auth/demo');
      expect(res.status).toBe(200);
      expect(res.body.user.email).toBe('aarav@nuzio.ai');
    });
  });

  describe('News Feed & Preferences Flow', () => {
    it('GET /api/news - Should return complete briefing dataset for authenticated user', async () => {
      const res = await request(app)
        .get('/api/news')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.briefing)).toBe(true);
      expect(res.body.briefing.length).toBe(10);
      
      const firstStory = res.body.briefing[0];
      expect(firstStory).toHaveProperty('id');
      expect(firstStory).toHaveProperty('title');
      expect(firstStory).toHaveProperty('body');
      expect(firstStory).toHaveProperty('minutes');
    });

    it('PUT /api/preferences - Should update and persist user calibration choices', async () => {
      const newPreferences = {
        profession: 'Founder / Builder',
        niches: ['AI & Technology', 'Startups', 'Financial Markets'],
        voice: 'Meera',
        briefLength: '10 min',
        deliveryTime: '8:00 AM',
        plan: 'Pro'
      };

      const res = await request(app)
        .put('/api/preferences')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ preferences: newPreferences });

      expect(res.status).toBe(200);
      expect(res.body.user.preferences.profession).toBe('Founder / Builder');
      expect(res.body.user.preferences.voice).toBe('Meera');
      expect(res.body.user.preferences.plan).toBe('Pro');
    });

    it('GET /api/news - Should return 401 Unauthorized when requesting without Bearer token', async () => {
      const res = await request(app).get('/api/news');
      expect(res.status).toBe(401);
    });
  });
});
