const express = require('express');
const pool  = require('../db');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { name, address, email, phoneNumber } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO "userinfo" (name, address, email, phoneNumber) VALUES ($1, $2, $3, $4) RETURNING *;',
      [name, address, email, phoneNumber]
    );
    client.release();
    console.log("inserted seccussfully");
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM "userinfo" WHERE id = $1;', [userId]);
      client.release();
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const client = await pool.connect();
      const result = await client.query('DELETE FROM "userinfo" WHERE id = $1 RETURNING *;', [userId]);
      client.release();
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    console.log(req.body);
    const { name, address, email, phoneNumber } = req.body;
  
    try {
      const client = await pool.connect();
      const result = await client.query(
        'UPDATE "userinfo" SET name = $1, address = $2, email = $3, phoneNumber = $4 WHERE id = $5 RETURNING *;',
        [name, address, email, phoneNumber, userId]
      );
      client.release();
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
