import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error('❌ Database credentials not set in .env');
}

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME ?? 'repllix',
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
});


// Test database connection
pool.query('SELECT NOW()')
  .then(() => console.log('[Server] Connected to PostgreSQL'))
  .catch((err) => console.error('[Server] PostgreSQL connection error:', err.message));

// ============================================
// API Routes
// ============================================

// Save message
app.post('/api/messages', async (req, res) => {
  const { session_id, user_id, role, content, source, metadata } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO conversations (session_id, user_id, role, content, source, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [session_id, user_id, role, content, source, JSON.stringify(metadata || {})]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Save message error:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Get conversation history
app.get('/api/conversations/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const limit = parseInt(req.query.limit as string) || 20;

  try {
    const result = await pool.query(
      `SELECT * FROM conversations
       WHERE session_id = $1
       ORDER BY created_at ASC
       LIMIT $2`,
      [sessionId, limit]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Failed to get conversation' });
  }
});

// Get user profile
app.get('/api/profiles/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT brand_tone, company_name FROM profiles WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      res.json({ brand_tone: 'friendly', company_name: 'Our Company' });
    } else {
      res.json({
        brand_tone: result.rows[0].brand_tone || 'friendly',
        company_name: result.rows[0].company_name || 'Our Company',
      });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.json({ brand_tone: 'friendly', company_name: 'Our Company' });
  }
});

// Search knowledge base
app.get('/api/knowledge/:userId', async (req, res) => {
  const { userId } = req.params;
  const query = req.query.q as string;
  const limit = parseInt(req.query.limit as string) || 5;

  try {
    const result = await pool.query(
      `SELECT id, title, content FROM knowledge_base
       WHERE user_id = $1 AND (title ILIKE $2 OR content ILIKE $2)
       LIMIT $3`,
      [userId, `%${query}%`, limit]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Knowledge search error:', error);
    res.json([]);
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'local-postgres' });
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`[Server] API running on http://localhost:${PORT}`);
});
