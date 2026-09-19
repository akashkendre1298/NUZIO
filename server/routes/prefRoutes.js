import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { publicUser } from '../data/users.js';

const router = Router();

router.put('/preferences', requireAuth, (req, res) => {
  const newPrefs = req.body.preferences || {};
  req.user.preferences = {
    ...req.user.preferences,
    ...newPrefs
  };
  res.json({ user: publicUser(req.user) });
});

export default router;
