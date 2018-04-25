import { CPF, CNPJ } from 'cpf_cnpj';
import yup from 'yup';

import moment from 'moment';
import 'moment/locale/pt-br';

const createKeys = {
  cpf: yup.string().required('É necessário informar o CPF.')
    .test('is-cpf', 'O CPF informado não é válido.', c => CPF.isValid(c))
    .transform(c => CPF.strip(c)),
  cnpj: yup.string().required('É necessário informar o CNPJ.')
    .test('is-cnpj', 'O CNPJ informado não é válido.', c => CNPJ.isValid(c))
    .transform(c => CNPJ.strip(c)),
  email: yup.string().required('É necessário informar o endereço de e-mail.')
    .email('O endereço de e-mail informado não é válido.'),
  password: yup.string().required(),
  confirmPassword: yup.string().required()
    .equals([yup.ref('password')]),
  birthday: yup
    .string()
    .required()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/)
    .test('valid-date', 'A data de nascimento informada não é válida.', x => moment(x, 'DD/MM/YYYY').isValid()),
};

const createValidation = yup.object().shape(Object.assign(createKeys, {
  approved: yup.boolean().default(false),
  emailChecked: yup.boolean().default(false),
}));

export { createKeys, createValidation };
export default createValidation;

