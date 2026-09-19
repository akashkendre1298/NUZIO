import express from 'express';
import path from 'node:path';
import authRoutes from './server/routes/authRoutes.js';
import newsRoutes from './server/routes/newsRoutes.js';
import prefRoutes from './server/routes/prefRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', newsRoutes);
app.use('/api', prefRoutes);

// Serve static compiled frontend assets
app.use(express.static(path.resolve('dist')));

// Catch-all route to serve index.html for client-side routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Nuzio full-stack app running on port ${PORT}`));
