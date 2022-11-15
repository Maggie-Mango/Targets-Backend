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

            
DROP TABLE IF EXISTS case_assignment;
CREATE TABLE case_assignment (
  id SERIAL PRIMARY KEY,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_by VARCHAR(100) DEFAULT 'test',
  table_data JSON 
);

--potential sample data
INSERT INTO case_assignment(table_data) VALUES ('{
    "data":[
        {
            "agent_name": "testAgent",
            "tags": ["veriff", "closer"], 
            "ooo": false, 
            "total": 100, 
            "ca_tr": 5, 
            "fa": 20, 
            "bf": 5, 
            "lbu": 0, 
            "gmgb": 30, 
            "uncat": 40, 
            "carding": 0, 
            "ach": 0, 
            "cb_tag": 0, 
            "ssp": 0, 
            "ssp_high": 0, 
            "ef": 0 
        }
    ]
}');





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