const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

// Return companies and person, ignore later if needed
router.post('/', async (req, res) => {
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

// returns if member follows any of the search results
router.get('/following/:search', auth, async (req, res) => {
  try {
    const { id } = req.member;
    const { search } = req.params;
    // Person query
    const person_result = await db.query(
      `SELECT person_uid, NAME, CASE WHEN person_uid IN ` +
        `(SELECT person_uid FROM member_person WHERE ` +
        `member_uid ='${id}') THEN true ELSE false END AS following ` +
        `FROM person WHERE NAME ILIKE '${search}%'`
    );

    // Company query
    const company_result = await db.query(
      `SELECT ticker, company, CASE WHEN ticker IN ` +
        `(SELECT ticker FROM member_company WHERE member_uid = '${id}')` +
        `then TRUE ELSE FALSE END AS following FROM company WHERE ticker ` +
        `ILIKE '${search}%'`
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
router.get('/:search', async (req, res) => {
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
router.get('/person/:personid', async (req, res) => {
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
router.get('/company/:ticker', async (req, res) => {
  try {
    const { ticker } = req.params;

    const ticker_trans = await db.query(
      `SELECT * FROM transaction AS t JOIN person AS p ON t.person_uid = p.person_uid WHERE ticker = '${ticker}'`
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

module.exports = router;
