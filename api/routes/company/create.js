import _ from 'lodash';
import uuid from 'uuid';
import googleGeocoding from 'google-geocoder';

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
const googleGeocoder = googleGeocoding({ key: config.googleMapsAPI });

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
    .then(data => new Promise((resolve) => {
      const pieces = Object.values(_.omit(
        _.get(data, 'bipbopContentRFB.enderecos.endereco'),
        'complemento',
      ));
      pieces.push('BR');
      const address = pieces.join(', ');
      googleGeocoder.find(address, (err, geoloc) => {
        if (err) {
          resolve(data);
          return;
        }
        resolve(Object.assign(data, { geoloc }));
      });
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
