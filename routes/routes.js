import express from 'express';
import { deleteAgent, getNames } from '../controllers/LeadsView/agent.js';
import { getCaseTypes } from '../controllers/LeadsView/caseType.js';
import { getTags } from '../controllers/LeadsView/tag.js';
import { getData } from '../controllers/OpsView/getTargets.js';

const router = express.Router();

//get agent names
router.get('/agent', getNames);

//delete agent
router.delete('/agent/:name', deleteAgent);

router.get('/case', getCaseTypes);

router.get('/tags', getTags);

router.get('/data', getData)


export default router;