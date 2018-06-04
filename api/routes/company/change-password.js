/* eslint no-underscore-dangle: 0 */

import yup from 'yup';
import uuid from 'is-uuid';

import database from '../../database';
import { securePassword } from './password';

const authFailed = 'Sua senha e/ou endereço de e-mail não conferem.';

const { associated } = database;

export default (req, res, next) => yup.object()
  .shape({
    emailCode: yup.string().required().test('is-uuid', '', testUuid => uuid.anyNonNil(testUuid)),
    newPassword: yup.string().required(),
    confirmNewPassword: yup.string().required(),
  })
  .validate(req.body)
  .then(({ emailCode, newPassword }) => Promise.resolve()
    .then(() => associated.findOne({ emailCode }, { })
      .then((data) => {
        if (!data) throw new Error(authFailed);
        if (emailCode !== data.emailCode) throw new Error(authFailed);
      }))
    .then(() => securePassword({ password: newPassword }))
    .then(({ password }) => associated.findAndModify({
      query: {
        emailCode,
      },
      update: {
        $set: {
          password,
          emailChecked: true,
        },
      },
    })))
  .then(() => res.json(true))
  .catch(e => next(e));
