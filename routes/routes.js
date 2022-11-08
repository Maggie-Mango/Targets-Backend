import express from 'express';
import { getNames, deleteAgent, addAgent } from '../controllers/LeadsView/agent.js';
import { getCaseTypes, deleteCaseType, addCaseType } from '../controllers/LeadsView/caseType.js';
import { getTags, deleteTag, addTag } from '../controllers/LeadsView/tag.js';
import { getData } from '../controllers/OpsView/getTargets.js';
import { getAvg } from '../controllers/LeadsView/snowflake.js';

const router = express.Router();

//agent routes
router.get('/agent', getNames);
router.delete('/deleteagent/:agent', deleteAgent);
router.post('/addagent/:agent', addAgent);

//casetype routes
router.get('/case', getCaseTypes);
router.delete('/deletecase_type/:case_type', deleteCaseType);
router.post('/addcase_type/:case_type', addCaseType);


//noncasework tag routes
router.get('/tags', getTags);
router.delete('/deletetag/:tag', deleteTag);
router.post('/addtag/:tag', addTag);


//snowflake data
router.get('/snowflake', getAvg )


router.get('/data', getData)


export default router;