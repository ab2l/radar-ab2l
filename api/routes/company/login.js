/* eslint no-underscore-dangle: 0 */

import yup from 'yup';
import uuid from 'uuid';
import _ from 'lodash';

import redis from '../../redis';
import database from '../../database';
import { testPassword } from './password';

const authFailed = 'Sua senha e/ou endereço de e-mail não conferem.';

const { associated } = database;

export default (req, res, next) => {
  const token = uuid.v4();
  yup.object()
    .shape({
      email: yup.string().required().email(),
      password: yup.string().required(),
    })
    .validate(req.body)
    .then(({ email, password }) => associated.findOne({ email }, { })
      .then((data) => {
        if (!data) throw new Error(authFailed);
        return testPassword(password, data).then((match) => {
          if (!match) throw new Error(authFailed);
          return data;
        });
      }))
    .then(content => Promise.all([
      redis.set(`auth-${content._id.toString()}`, token, 'EX', '604800'),
      res.json(_.omit(Object.assign(content, { token }), [
        'emailCode',
        'password',
      ])),
    ]))
    .catch(e => next(e));
};
