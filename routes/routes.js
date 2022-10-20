import express from 'express';
import { deleteAgent, getNames } from '../controllers/agent.js';
import { getCaseTypes } from '../controllers/caseType.js';
import { getTags } from '../controllers/tag.js';

const router = express.Router();

//get agent names
router.get('/agent', getNames);

//delete agent
router.delete('/agent/:name', deleteAgent);

//add agent
//router.post('/agent', addAgent);

router.get('/case', getCaseTypes);

router.get('/tags', getTags);

export default router;