import express from 'express';
import { getNames, deleteAgent } from '../controllers/LeadsView/agent.js';
import { getCaseTypes, deleteCaseType } from '../controllers/LeadsView/caseType.js';
import { getTags, deleteTag } from '../controllers/LeadsView/tag.js';
import { getData } from '../controllers/OpsView/getTargets.js';

const router = express.Router();

//agent routes
router.get('/agent', getNames);
router.delete('/deleteagent/:agent', deleteAgent);

//casetype routes
router.get('/case', getCaseTypes);
router.delete('/deletecase_type/:case_type', deleteCaseType);

//noncasework tag routes
router.get('/tags', getTags);
router.delete('/deletetag/:tag', deleteTag)

router.get('/data', getData)


export default router;