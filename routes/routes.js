import express from 'express';
import { getNames } from '../controllers/agent.js';

const router = express.Router();

//get agent names
router.get('/agent', getNames);

//delete agent
//outer.delete('/agent/:name');

//add agent
//router.post('/agent', addAgent);

export default router;