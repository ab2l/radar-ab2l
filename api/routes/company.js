import express from 'express';
import mongodb from 'mongodb';

import edit, { name } from './company/edit';
import login from './company/login';
import create from './company/create';
import validateEmail from './company/validate-email';
import changePassword from './company/change-password';
import recoverPassword from './company/recover-password';
import { upload128Pixels } from './company/image';

import database from '../database';

const { associated } = database;


const router = express.Router();

router.use(express.json());

router.post('/login', login);
router.post('/create', create);
router.post('/validateEmail', validateEmail);
router.post('/changePassword', changePassword);
router.post('/recoverPassword', recoverPassword);
router.post('/uploadImage', ...upload128Pixels);
router.post('/edit', edit);
router.post('/name', name);

router.get('/:id', (req, res) => associated.findOne({ _id: mongodb.ObjectId(req.params.id) }, {
  cpf: false,
  password: false,
  emailCode: false,
  emailReceipt: false,
  email: false,
  bipbopContentRFBCPF: false,
}).then(x => res.json(x)));


router.get('/', (req, res) => associated.find({
  approved: true,
  emailChecked: true,
}, {
  cpf: false,
  password: false,
  emailCode: false,
  emailReceipt: false,
  email: false,
  bipbopContentRFBCPF: false,
}).then(x => res.json(x)));

export default router;
