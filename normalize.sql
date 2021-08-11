-- Transactions Raw Table
CREATE TABLE transactions_raw(
title VARCHAR(64),
date_of_trans DATE,
transaction_code VARCHAR(32),
amount NUMERIC(13,4),
adq_or_disp VARCHAR(32),
price NUMERIC(13,4),
shares_owned_after_trans NUMERIC(13,4),
direct_or_indirect_ownership VARCHAR(16),
nature_of_ind_ownership VARCHAR(124),
position VARCHAR(64),
name_person VARCHAR(64),
ticker VARCHAR(16)
);
UPDATE transactions_raw set name_person = UPPER(TRIM(name_person));

-- Person Table
CREATE TABLE person (
	person_uid UUID NOT NULL PRIMARY KEY,
	name VARCHAR(64)
);
create extension if not exists "uuid-ossp";
INSERT INTO person (person_uid, name) select uuid_generate_v4(), (name_person) from (select distinct name_person from transactions_raw) t;

-- Company Table
CREATE TABLE company (
	ticker VARCHAR(16) NOT NULL PRIMARY KEY,
  company VARCHAR(120),
	UNIQUE(ticker)
);

-- Person Position Table
CREATE TABLE person_position (
	person_uid UUID REFERENCES person(person_uid),
	position VARCHAR(64),
	ticker VARCHAR(16)
);
INSERT INTO person_position
            (person_uid,
             position,
             ticker)
SELECT DISTINCT person.person_uid,
                transactions_raw.position,
                transactions_raw.ticker
FROM   transactions_raw
       JOIN person
         ON transactions_raw.name_person = person.name;


-- INSERT INTO company
--             (ticker)
-- SELECT DISTINCT ticker
-- FROM   transactions_raw;


-- Transactions Table
CREATE TABLE transaction (
	trans_uid UUID NOT NULL PRIMARY KEY,
	title VARCHAR(64),
	date_of_trans DATE,
	transactions_code VARCHAR(32),
	amount NUMERIC(13,4),
	adq_or_disp VARCHAR(32),
	price NUMERIC(13,4),
	shares_owned_after_trans NUMERIC(13,4),
	direct_or_indirect_ownership VARCHAR(16),
	person_uid UUID REFERENCES person(person_uid),
	ticker VARCHAR(16) REFERENCES company(ticker)
);
INSERT INTO transaction
            (trans_uid,
						 title,
						 date_of_trans,
						 transactions_code,
						 amount,
						 adq_or_disp,
						 price,
						 shares_owned_after_trans,
						 direct_or_indirect_ownership,
						 person_uid,
             ticker)
SELECT uuid_generate_v4() as trans_uid,
       title,
       date_of_trans,
       transaction_code,
       amount,
       adq_or_disp,
       price,
       shares_owned_after_trans,
       direct_or_indirect_ownership,
       person_uid,
       ticker
FROM
  (SELECT DISTINCT title,
                   date_of_trans,
                   transaction_code,
                   amount,
                   adq_or_disp,
                   price,
                   shares_owned_after_trans,
                   direct_or_indirect_ownership,
                   person.person_uid,
                   company.ticker
   FROM transactions_raw
   JOIN person ON transactions_raw.name_person = person.name
   JOIN company ON transactions_raw.ticker = company.ticker) t;

-- Users Table
CREATE TABLE member(
	member_uid UUID NOT NULL PRIMARY KEY,
  first_name VARCHAR(64),
  last_name VARCHAR(64),
  email VARCHAR(120),
  password VARCHAR(64)
);

-- User Company Table
CREATE TABLE member_company(
  member_uid UUID REFERENCES member(member_uid) NOT NULL,
  ticker VARCHAR(16) REFERENCES company(ticker) NOT NULL
);

-- User Person Table
CREATE TABLE member_person(
  member_uid UUID REFERENCES member(member_uid) NOT NULL,
  person_uid UUID REFERENCES person(person_uid) NOT NULL
);

INSERT INTO member(member_uid, first_name, last_name, email, password) 
VALUES(uuid_generate_v4(), 'Michelle', 'Lucero', 'lucero@gmail.com','123456' );