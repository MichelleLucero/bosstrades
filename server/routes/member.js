const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// code from bosstrades v1
router.post('/', async (req, res) => {
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

router.put('/', auth, async (req, res) => {
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
router.delete('/', auth, async (req, res) => {
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

router.get('/', auth, async (req, res) => {
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
router.post('/company', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const { ticker } = req.body;
    const followCheck = await db.query(
      'SELECT * FROM member_company WHERE member_uid = $1 AND ticker = $2',
      [id, ticker]
    );

    if (followCheck.rowCount === 0) {
      const result = await db.query(
        'INSERT INTO member_company(member_uid, ticker) VALUES($1, $2) returning *',
        [id, ticker]
      );
      res.json(result.rows[0]);
    } else {
      res.status(500).send('Already Exists');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get all companies from member
router.get('/company', auth, async (req, res) => {
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
router.delete('/company', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const { ticker } = req.body;

    const company = await db.query(
      'DELETE FROM member_company WHERE member_uid = $1 AND ticker = $2',
      [id, ticker]
    );

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
router.post('/person', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const { person_uid } = req.body;
    const followCheck = await db.query(
      'SELECT * FROM member_person WHERE member_uid = $1 AND person_uid = $2',
      [id, person_uid]
    );

    if (followCheck.rowCount === 0) {
      const result = await db.query(
        'INSERT INTO member_person(member_uid, person_uid) VALUES($1, $2) returning *',
        [id, person_uid]
      );
      res.json(result.rows[0]);
    } else {
      res.status(500).send('Already Exists');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get all person from member
router.get('/person', auth, async (req, res) => {
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
router.delete('/person', auth, async (req, res) => {
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

module.exports = router;
