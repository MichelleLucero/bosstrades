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
const search = require('./routes/search');
const port = process.env.port || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/search', search);

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

    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(password, salt);

    const result = await db.query(
      'INSERT INTO member(member_uid, first_name, last_name, email, password) VALUES(uuid_generate_v4(), $1, $2, $3, $4 ) returning *',
      [first_name, last_name, email, pwd]
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
    const member = await db.query(
      `SELECT * FROM member where member_uid = '${id}'`
    );

    if (email != member.rows[0].email) {
      const check_email = await db.query(
        `SELECT * FROM member where email = '${email}'`
      );
      if (check_email.rows.length > 0) {
        return res.status(400).json({ msg: 'email is taken' });
      }
    }

    const isMatch = await bcrypt.compare(password, member.rows[0].password);
    let pwd = password;
    if (!isMatch) {
      const salt = await bcrypt.genSalt(10);
      pwd = await bcrypt.hash(password, salt);
    }
    // const salt = await bcrypt.genSalt(10);
    // const pwd = await bcrypt.hash(password, salt);

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

app.get('/api/member/', auth, async (req, res) => {
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

// insert company to member
app.post('/api/member/company', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const { ticker } = req.body;
    const result = await db.query(
      'INSERT INTO member_company(member_uid, ticker) VALUES($1, $2) returning *',
      [id, ticker]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get all companies from member
app.get('/api/member/company', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const companies = await db.query(
      'SELECT * FROM member_company WHERE member_uid = $1',
      [id]
    );
    res.json(companies.rows);
    // res.json({ id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// delete company from member
app.delete('/api/member/company', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const { ticker } = req.body;

    const company = await db.query(
      'DELETE FROM member_company WHERE member_uid = $1 AND ticker = $2',
      [id, ticker]
    );
    console.log(company);
    if (company.rowCount === 0) {
      console.error('Nothing deleted');
      return res.status(500).send('Server Error');
    }
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// insert person to members
app.post('/api/member/person', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const { person_uid } = req.body;
    const result = await db.query(
      'INSERT INTO member_person(member_uid, person_uid) VALUES($1, $2) returning *',
      [id, person_uid]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get all person from member
app.get('/api/member/person', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const persons = await db.query(
      'SELECT * FROM member_person AS mp JOIN person AS p ON mp.person_uid = p.person_uid WHERE member_uid = $1',
      [id]
    );
    res.json(persons.rows);
    // res.json({ id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// delete person from member
app.delete('/api/member/person', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const { person_uid } = req.body;
    const person = await db.query(
      'DELETE FROM member_person WHERE member_uid = $1 and person_uid = $2',
      [id, person_uid]
    );

    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log('server has started on port 5000');
});
