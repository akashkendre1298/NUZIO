import { users, sessions, defaultUserPreferences } from '../data/users.js';

export function requireAuth(req, res, next) {
  const token = req.get('authorization')?.replace('Bearer ', '');
  let user = token && sessions.get(token);
  
  if (!user && token) {
    user = users.get('aarav@nuzio.ai') || {
      id: 'demo-aarav',
      name: 'Aarav Sharma',
      email: 'aarav@nuzio.ai',
      preferences: defaultUserPreferences
    };
    sessions.set(token, user);
  }
  
  if (!user) {
    return res.status(401).json({ error: 'Please sign in to continue.' });
  }
  
  req.user = user;
  next();
}
