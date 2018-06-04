/* eslint no-underscore-dangle: 0 */

import yup from 'yup';
import uuid from 'uuid';

import database from '../../database';
import mail from '../../mail';
import validateEmail from '../../../email/recover-password-email';
import config from '../../config';

const { associated } = database;

export default (req, res, next) => yup
  .string()
  .required()
  .email()
  .validate(req.body.email)
  .then(email => associated.findOne({ email }, { }))
  .then((data) => {
    if (!data) throw new Error('Não há uma conta registrada com este enderereço de e-mail.');
    return Object.assign(data, { emailCode: uuid.v4() });
  })
  .then(data => associated.findAndModify({
    query: {
      email: data.email,
    },
    update: {
      $set: { emailCode: data.emailCode },
    },
    new: true,
  }))
  .then(data => mail.messages().send({
    from: `AB2L <no-reply@${config.mailgun.domain}>`,
    to: data.email,
    subject: 'Recuperação da senha do Radar AB2L',
    text: validateEmail(data, config),
  }))
  .then(() => res.json(true))
  .catch(e => next(e));
