/* eslint no-underscore-dangle: 0 */

import yup from 'yup';
import uuid from 'is-uuid';
import mongodb from 'mongodb';

import redis from '../../redis';
import database from '../../database';

const { associated } = database;

const isUUID = yup
  .string()
  .required();

export const name = (req, res, next) => {
  yup.object().shape({
    _id: isUUID.test('is-uuid', '', _id => mongodb.ObjectID.isValid(_id)),
    token: isUUID.test('is-uuid', '', token => uuid.v4(token)),
  })
    .validate(req.body)
    .then(obj => redis.get(`auth-${obj._id}`)
      .then(memory => Object.assign(obj, { memory })))
    .then((content) => {
      const { memory, token } = content;
      if (memory === token) return content;
      throw new Error('Não foi possível autenticar seu token.');
    })
    .then(response => associated.findAndModify({
      query: {
        _id: new mongodb.ObjectId(response._id),
      },
      update: {
        $set: {
          'bipbopContentRFB.nome': (response.value || null),
        },
      },
      new: true,
    }))
    .then(response => res.json(response))
    .catch(e => next(e));
};


export default (req, res, next) => {
  yup.object().shape({
    _id: isUUID.test('is-uuid', '', _id => mongodb.ObjectID.isValid(_id)),
    token: isUUID.test('is-uuid', '', token => uuid.v4(token)),
    field: yup.string().required(),
  })
    .validate(req.body)
    .then(obj => redis.get(`auth-${obj._id}`)
      .then(memory => Object.assign(obj, { memory })))
    .then((content) => {
      const { memory, token } = content;
      if (memory === token) return content;
      throw new Error('Não foi possível autenticar seu token.');
    })
    .then(response => associated.findAndModify({
      query: {
        _id: new mongodb.ObjectId(response._id),
      },
      update: {
        $set: {
          [`userContext_${response.field}`]: (response.value || null),
        },
      },
      new: true,
    }))
    .then(response => res.json(response))
    .catch(e => next(e));
};
