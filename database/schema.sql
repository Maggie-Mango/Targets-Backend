DROP DATABASE case_targets;
CREATE DATABASE case_targets;
USE case_targets;

--Edit tables as needed
DROP TABLE IF EXISTS agent_names;
CREATE TABLE agent_names (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  ldap VARCHAR(100),
  ooo BOOLEAN DEFAULT FALSE,
  team VARCHAR(100),
  tags VARCHAR(100) DEFAULT 'default'
);

INSERT INTO agent_names (name, ldap, team)
VALUES
    ('Alyce', 'alyce', 'FTE'),
    ('Antoine D', 'antoineD', 'FTE'),
    ('Cesare', 'cesare', 'FTE'),
    ('Cierra', 'cmacon', 'FTE'),
    ('Cory', 'carchuleta', 'FTE'),
    ('Dennis', 'ddonovan', 'FTE'),
    ('Ed', 'elong', 'FTE'),
    ('Hector', 'hfranco', 'FTE'),
    ('Jaina', 'jaina', 'FTE'),
    ('Kasandra', 'kasandra', 'FTE'),
    ('Michaela', 'mtussey', 'FTE'),
    ('Nick', 'nsavage', 'FTE'),
    ('Rachel', 'rmurphy', 'FTE'),
    ('Robert', 'ralexander', 'FTE'),
    ('Stephanie', 'smonteon', 'FTE'),
    ('Vlad', 'vghisoiu', 'FTE');

            
DROP TABLE IF EXISTS case_targets;
CREATE TABLE case_targets (
  id SERIAL PRIMARY KEY,
  agentname VARCHAR(100),
  noncasework JSON,
  ooo BOOLEAN,
  TR_TOTAL INTEGER,
  SSP_TOTAL INTEGER,
  ACH INTEGER,
  BF INTEGER,
  FA INTEGER,
  CARDING INTEGER,
  RESPONSE INTEGER,
  RESPONSE INTEGER,
  AFTERPAY INTEGER,
  VERIFF INTEGER,
  UNCAT INTEGER,
  GMGB INTEGER,
  UNLINKED_REFUNDS INTEGER,
  LBU INTEGER,
  EF INTEGER,
  target_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  submitted_by VARCHAR(100) DEFAULT 'test',
  updated_at DATETIME DEFAULT NULL,
  table_data JSON 
);






DROP TABLE IF EXISTS noncasework_tags;
CREATE TABLE noncasework_tags (
  id SERIAL PRIMARY KEY,
  tag VARCHAR(100)
);

INSERT INTO noncasework_tags (tag)
VALUES
    ('Reactivation'),
    ('Slack Esc'),
    ('Veriff'),
    ('Closer'),
    ('CAD DRI'),
    ('Sunset'),
    ('SSP DRI'),
    ('CAD DRI');

DROP TABLE IF EXISTS paf_casetypes;
CREATE TABLE paf_casetypes (
  id SERIAL PRIMARY KEY,
  case_type VARCHAR(100),
  is_tr BOOLEAN,
  is_ssp BOOLEAN
);

INSERT INTO paf_casetypes (case_type, is_tr, is_ssp)
VALUES
    ('DAY', NULL, NULL),
    ('TR_TOTAL', NULL, NULL),
    ('SSP_TOTAL', NULL, NULL),
    ('ACH', TRUE, FALSE),
    ('BF', TRUE, FALSE),
    ('FA', TRUE, FALSE),
    ('CARDING', TRUE, FALSE),
    ('RESPONSE', TRUE, FALSE),
    ('AFTERPAY', TRUE, FALSE),
    ('VERIFF', TRUE, FALSE),
    ('UNCAT', TRUE, FALSE),
    ('GMGB', TRUE, FALSE),
    ('UNLINKED_REFUNDS', TRUE, FALSE),
    ('LBU', TRUE, FALSE),
    ('EF', FALSE, FALSE);