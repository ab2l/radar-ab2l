import { CPF, CNPJ } from 'cpf_cnpj';
import yup from 'yup';

import moment from 'moment';
import 'moment/locale/pt-br';

const createKeys = {
  cpf: yup.string().required()
    .test('is-cpf', '', c => CPF.isValid(c))
    .transform(c => CPF.strip(c)),
  cnpj: yup.string().required()
    .test('is-cnpj', '', c => CNPJ.isValid(c))
    .transform(c => CNPJ.strip(c)),
  email: yup.string().required().email(),
  password: yup.string().required(),
  confirmPassword: yup.string().required().equals([yup.ref('password')]),
  birthday: yup
    .string()
    .required()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .test('valid-date', '', x => moment(x, 'DD/MM/YYYY').isValid()),
};

const createValidation = yup.object().shape(Object.assign(createKeys, {
  approved: yup.boolean().default(false),
  emailChecked: yup.boolean().default(false),
}));

export { createKeys, createValidation };
export default createValidation;

