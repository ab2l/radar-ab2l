import yup from 'yup';
import uuid from 'uuid';

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
    .then(({ email, password }) => associated.findOne({ email }, { _id: true, password: true })
      .then(data => testPassword(password, data).then((match) => {
        if (!match) throw new Error(authFailed);
        return data;
      })))
    .then(({ _id }) => Promise.all([
      redis.set(`auth-${_id.toString()}`, token, 'EX', '604800'),
      res.json({ _id, token }),
    ]))
    .catch(e => next(e));
};
