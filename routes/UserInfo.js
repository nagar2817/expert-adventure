const express = require('express');
const pool  = require('../db');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const client =  await pool.connect();
    const { username, firstname, lastname, email, phonenumber,address } = req.body;
    const checkQuery = 'SELECT * FROM userinfo WHERE username = $1';
    const checkResult = await client.query(checkQuery, [username]);
    if (checkResult.rows.length > 0) {
      // User with the provided username already exists, perform UPDATE operation
      const updateQuery = `
        UPDATE userinfo
        SET firstname = $2, lastname = $3, email = $4, phonenumber = $5, address = $6
        WHERE username = $1
      `;

      const result = await client.query(updateQuery, [username, firstname, lastname, email, phonenumber, address]);
    client.release(); 
    res.status(200).json(result.rows[0]); // Respond with a success status
      // return res.json(result.rows[0]);

    }else{
      const result = await client.query(
        'INSERT INTO "userinfo" (username, firstname,lastname, email, phonenumber, address) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *;',
        [username,firstname,lastname, email, phonenumber, address]
      );
    client.release(); 
          // res.sendStatus(200);
      // return res.json(result.rows[0]);
    res.status(200).json(result.rows[0]); // Respond with a success status

    }
    // console.log("inserted seccussfully");
    // res.json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

router.get('/:username', async (req, res) => {
    const username = req.params.username;
  
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM "userinfo" WHERE username = $1;', [username]);  
      client.release();
  
      if (result.rows.length === 0) {
        console.log("no users");
        res.json({});
        // return res.status(404).json({ error: 'User not found' });
      } 
      
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


module.exports = router;
