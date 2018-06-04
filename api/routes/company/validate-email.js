import yup from 'yup';
import uuid from 'is-uuid';

import database from '../../database';

const { associated } = database;

export default (req, res, next) =>
  yup.string()
    .test('is-uuid', '', testUuid => uuid.anyNonNil(testUuid))
    .required()
    .validate(req.body.c)
    .then(emailCode => associated.findAndModify({
      query: {
        emailCode,
      },
      update: {
        $set: { emailChecked: true },
      },
    }))
    .then(({ _id }) => res.json({ _id }))
    .catch(e => next(e));
