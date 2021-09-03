// Allows to look at a file that has password
require('dotenv').config();

const express = require('express');
const cors = require('cors');
// postgres database
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const auth = require('./middleware/auth');

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Return companies and person, ignore later if needed
app.post('/api/search/', async (req, res) => {
  try {
    const { search } = req.body;
    // Person query
    const person_result = await db.query(
      `SELECT * FROM person WHERE name ILIKE '${search}%'`
    );

    // Company query
    const company_result = await db.query(
      `SELECT * FROM company WHERE ticker ILIKE '${search}%'`
    );

    res
      .status(200)
      .json({ persons: person_result.rows, companies: company_result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// This creates a link to access person and company based search result
app.get('/api/search/:search', async (req, res) => {
  try {
    const { search } = req.params;
    // Person query
    const person_result = await db.query(
      `SELECT * FROM person WHERE name ILIKE '%${search}%'`
    );

    // Company query
    const company_result = await db.query(
      `SELECT * FROM company WHERE ticker ILIKE '%${search}%'`
    );

    res
      .status(200)
      .json({ persons: person_result.rows, companies: company_result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get person transactions
app.get('/api/search/person/:personid', async (req, res) => {
  try {
    const { personid } = req.params;

    const personid_trans = await db.query(
      `SELECT * FROM transaction WHERE person_uid = '${personid}'`
    );

    const person_name = await db.query(
      `SELECT name from person WHERE person_uid = '${personid}'`
    );

    res
      .status(200)
      .json({ person: person_name.rows[0], trans: personid_trans.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get company transactions
app.get('/api/search/company/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;

    const ticker_trans = await db.query(
      `SELECT * FROM transaction WHERE ticker = '${ticker}'`
    );

    const ticker_name = await db.query(
      `SELECT company as name FROM company WHERE ticker = '${ticker}'`
    );

    res
      .status(200)
      .json({ company: ticker_name.rows[0], trans: ticker_trans.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/member/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (first_name === '') res.status(400).send('First name is empty');
  if (last_name === '') res.status(400).send('Last name is empty');
  if (email === '') res.status(400).send('Email is empty');
  if (password === '') res.status(400).send('Password is empty');
  if (password.length < 6) res.status(400).send('Password is too short');

  try {
    const member = await db.query(
      `SELECT * FROM member where email = '${email}'`
    );
    if (member.rows.length > 0)
      return res.status(400).json({ msg: 'member already exists' });

    const isMatch = await bcrypt.compare(password, member.rows[0].password);

    if (!isMatch) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(password, salt);
    }

    // const salt = await bcrypt.genSalt(10);
    // const pwd = await bcrypt.hash(password, salt);

    const result = await db.query(
      'INSERT INTO member(member_uid, first_name, last_name, email, password) VALUES(uuid_generate_v4(), $1, $2, $3, $4 ) returning *',
      [first_name, last_name, email, password]
    );

    const payload = {
      member: {
        id: result.rows[0].member_uid,
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

app.put('/api/member/', auth, async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (first_name === '') res.status(400).send('First name is empty');
  if (last_name === '') res.status(400).send('Last name is empty');
  if (email === '') res.status(400).send('Email is empty');
  if (password === '') res.status(400).send('Password is empty');
  if (password.length < 6) res.status(400).send('Password is too short');

  try {
    const { id } = req.member;
    const user = await db.query(
      `SELECT * FROM member where email = '${email}'`
    );
    if (user.rows.length > 0)
      return res.status(400).json({ msg: 'email is taken' });

    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(password, salt);

    const result = await db.query(
      'UPDATE member SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE member_uid = $5 returning *',
      [first_name, last_name, email, pwd, id]
    );

    const payload = {
      member: {
        id: result.rows[0].member_uid,
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

// delete member
app.delete('/api/member/', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const member = await db.query('DELETE FROM member WHERE member_uid = $1', [
      id,
    ]);

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// login users
app.post('/api/auth/', async (req, res) => {
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

app.get('/api/auth/', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const member = await db.query(
      'SELECT member_uid, email, last_name, first_name FROM member WHERE member_uid = $1',
      [id]
    );
    res.json(member.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
