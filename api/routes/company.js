import express from 'express';

import login from './company/login';
import create from './company/create';
import validateEmail from './company/validate-email';

const router = express.Router();

router.use(express.json());

router.post('/login', login);
router.post('/create', create);
router.post('/validateEmail', validateEmail);

export default router;
