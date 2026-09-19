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

describe('Backend API Integration Tests', () => {
  let authToken = '';

  it('POST /api/auth/demo should return 200 and a valid session token', async () => {
    const res = await request(app).post('/api/auth/demo');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe('aarav@nuzio.ai');
    authToken = res.body.token;
  });

  it('GET /api/news with token should return 200 OK and news briefing array', async () => {
    const res = await request(app)
      .get('/api/news')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('briefing');
    expect(Array.isArray(res.body.briefing)).toBe(true);
    expect(res.body.briefing.length).toBeGreaterThan(0);
  });

  it('PUT /api/preferences with token should update user preferences', async () => {
    const res = await request(app)
      .put('/api/preferences')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ preferences: { voice: 'Meera', profession: 'Healthcare' } });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.preferences.voice).toBe('Meera');
    expect(res.body.user.preferences.profession).toBe('Healthcare');
  });

  it('GET /api/news without token should return 401 Unauthorized', async () => {
    const res = await request(app).get('/api/news');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
