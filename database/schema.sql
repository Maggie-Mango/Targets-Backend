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

/*

--sample submissions
INSERT INTO case_assignment (agent_name, ooo, tags)
VALUES
  ('Alyce', true, '["closer"]'),
    ('Antoine D', false, '["veriff"]'),
    ('Cesare', false, '["slack"]'),
    ('Cierra', false, '["slack"]'),
    ('Cory', false, '[]'),
    ('Dennis', false, '[]'),
    ('Ed', false, '[]'),
    ('Hector', false, '[]'),
    ('Jaina', false, '[]'),
    ('Kasandra', false, '["closer", "sunset"]'),
    ('Michaela', false, '["veriff", "ssp dri"]'),
    ('Nick', false, '["reactivation", "ssp"]'),
    ('Rachel', false, '["reactivation"]'),
    ('Robert', false, '[]'),
    ('Stephanie', false, '[]'),
    ('Vlad', false, '[]');
*/

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