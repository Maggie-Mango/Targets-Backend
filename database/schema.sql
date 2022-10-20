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
  team VARCHAR(100)
);

INSERT INTO agent_names (name, ldap, team)
VALUES
    ('Alyce', 'alyce', 'FTE'),
    ('Antoine D', 'antoineD', 'FTE'),
    ('Alyce', 'alyce', 'FTE'),
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


DROP TABLE IF EXISTS case_assignment;
CREATE TABLE case_assignment (
  id SERIAL PRIMARY KEY,
  agent_name VARCHAR(100),
  ooo BOOLEAN,
  tags JSON,
  updated_at DATE,
  updated_by VARCHAR(100),
  total INT,
  ca_tr INT,
  fa INT,
  bf INT,
  lbu INT,
  gmgb INT,
  uncat INT,
  carding INT,
  ach INT,
  cb_tag INT,
  ssp INT,
  ssp_high INT,
  ef INT
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
  case_type VARCHAR(100)
);

INSERT INTO paf_casetypes (case_type)
VALUES
    ('ca_tr'),
    ('fa'),
    ('bf'),
    ('lbu'),
    ('gmgb'),
    ('uncat'),
    ('carding'),
    ('ach'),
    ('cb_tag'),
    ('ssp'),
    ('ssp_high'),
    ('ef');


DROP TABLE IF EXISTS drafts;