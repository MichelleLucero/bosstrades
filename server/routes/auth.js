const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (email === '') res.status(400).send('Email is empty');
  if (password === '') res.status(400).send('Password is empty');
  if (password.length < 6) res.status(400).send('Password is too short');

  try {
    const member = await db.query('SELECT * FROM member WHERE email = $1', [
      email,
    ]);

    if (member.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, member.rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      member: {
        id: member.rows[0].member_uid,
      },
    };

    jwt.sign(
      payload,
      'secret', //todo put this in .env file
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
