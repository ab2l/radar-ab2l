import _ from 'lodash';
import uuid from 'uuid';

import moment from 'moment';
import 'moment/locale/pt-br';

import bipbopValidation from './bipbop-validation';
import { securePassword } from './password';
import { createKeys, createValidation } from './validations';

import mail from '../../mail';
import config from '../../config';
import database from '../../database';

import validateEmail from '../../../email/validate-email';

const { associated } = database;

export default (req, res, next) =>
  createValidation.validate(_.pick(req.body, Object.keys(createKeys)))
    .then(data => securePassword(data))
    .then(data => bipbopValidation(data))
    .then(data => Object.assign(data, { emailCode: uuid.v4() }))
    .then(data => Object.assign(data, {
      birthday: moment(data.birthday, 'DD/MM/YYYY').startOf('day').toDate(),
      birthdayCompany: moment(_.get(data, 'bipbopContentRFB.data-abertura'), 'DD/MM/YYYY').startOf('day').toDate(),
    }))
    .then(data => associated.findOne(_.pick(data, 'cnpj'), { _id: true }).then((count) => {
      if (count) throw new Error('Já existe uma lawtech cadastrada com este CNPJ.');
      return data;
    }))
    .then(data => associated.findOne(_.pick(data, 'email'), { _id: true }).then((count) => {
      if (count) throw new Error('Já existe uma lawtech cadastrada com este e-mail.');
      return data;
    }))
    .then(data => Promise.all([
      mail.messages().send({
        from: `AB2L <no-reply@${config.mailgun.domain}>`,
        to: data.email,
        subject: 'Confirmação do e-mail para o radar',
        text: validateEmail(data, config),
      }), Promise.resolve(data)]))
    .then(([emailReceipt, data]) => Object.assign(data, { emailReceipt }))
    .then((data) => {
      associated.insert(data);
      return data;
    })
    .then(({ _id }) => res.json({ _id }))
    .catch(e => next(e));
