const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.post('/api/v1/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/v1/animeCharacters', async (req, res) => {
  const result = await pool.query('SELECT * FROM characters');
  res.json(result.rows);
});

app.post('/api/v1/animeCharacters', async (req, res) => {
  const { name, anime, powerLevel } = req.body;
  const result = await pool.query(
    'INSERT INTO characters (name, anime, power_level) VALUES ($1, $2, $3) RETURNING *',
    [name, anime, powerLevel]
  );
  res.json(result.rows[0]);
});

app.patch('/api/v1/animeCharacters/:id', async (req, res) => {
  const { id } = req.params;
  const { name, anime, powerLevel } = req.body;
  const result = await pool.query(
    'UPDATE characters SET name = $1, anime = $2, power_level = $3 WHERE id = $4 RETURNING *',
    [name, anime, powerLevel, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/v1/animeCharacters/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM characters WHERE id = $1', [id]);
  res.sendStatus(204);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));