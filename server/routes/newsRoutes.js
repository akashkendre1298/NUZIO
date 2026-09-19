import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { stories } from '../data/stories.js';

const router = Router();

router.get('/news', requireAuth, (req, res) => {
  res.json({ briefing: stories, preferences: req.user.preferences });
});

export default router;
