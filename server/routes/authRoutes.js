import { Router } from 'express';
import crypto from 'node:crypto';
import { users, createSession, defaultUserPreferences } from '../data/users.js';

const router = Router();

router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Enter your name, email, and a password of at least 6 characters.' });
  }
  const normalized = email.toLowerCase();
  if (users.has(normalized)) {
    return res.status(409).json({ error: 'An account with that email already exists.' });
  }
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalized,
    password,
    preferences: { ...defaultUserPreferences }
  };
  users.set(normalized, user);
  res.status(201).json(createSession(user));
});

router.post('/login', (req, res) => {
  const user = users.get((req.body.email || '').toLowerCase());
  if (!user || user.password !== req.body.password) {
    return res.status(401).json({ error: 'That email or password does not match our records.' });
  }
  res.json(createSession(user));
});

router.post('/demo', (_req, res) => {
  let demoUser = users.get('aarav@nuzio.ai');
  if (!demoUser) {
    demoUser = {
      id: 'demo-aarav',
      name: 'Aarav Sharma',
      email: 'aarav@nuzio.ai',
      password: 'demopassword',
      preferences: { ...defaultUserPreferences }
    };
    users.set('aarav@nuzio.ai', demoUser);
  }
  res.json(createSession(demoUser));
});

export default router;
