import crypto from 'node:crypto';

export const users = new Map();
export const sessions = new Map();

export const defaultUserPreferences = {
  language: 'English',
  locationEnabled: true,
  profession: 'Technology',
  niches: ['AI & Technology', 'Financial Markets', 'Startups', 'Indian Business', 'Science'],
  voice: 'Aria',
  briefLength: '5 min',
  deliveryTime: '7:00 AM',
  notificationsEnabled: true,
  plan: 'Free'
};

export function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    preferences: user.preferences || defaultUserPreferences
  };
}

export function createSession(user) {
  const token = crypto.randomUUID();
  sessions.set(token, user);
  return { token, user: publicUser(user) };
}
