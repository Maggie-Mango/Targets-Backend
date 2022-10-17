DROP DATABASE case_targets;
CREATE DATABASE case_targets;
USE case_targets;

--Edit tables as needed
DROP TABLE IF EXISTS agent_names;
CREATE TABLE agent_names (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  ldap VARCHAR(100),
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
  ef INT
);

DROP TABLE IF EXISTS noncasework_tags;
CREATE TABLE hashtags (
  id SERIAL PRIMARY KEY,
  tag VARCHAR(100)
);

DROP TABLE IF EXISTS drafts;