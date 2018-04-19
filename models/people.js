import yup from 'yup';
import isUUID from 'is-uuid';
import CPF from 'cpf_cnpj';

export const description = {
  name: 'Pessoas',
  description: 'Pessoas envolvidas na composição da empresa associada a AB2L.',
};

export default yup.object().shape({
  cpf: yup.string()
    .required()
    .test('is-cnpj', '', c => CPF.isValid(c)),
  birthday: yup.date().required(),
  username: yup.string().required(),
  name: yup.string().required(),
  fullname: yup.string().required(),
  firstName: yup.string().required(),
  surname: yup.string().required(),
  photo: yup.string().required().url(),
  biography: yup.string().required().min(256),
  summary: yup.string().required().max(256),
  female: yup.boolean().required(),
  links: yup.array().of(yup.string()),
  associatedCompany: yup.array().of(yup.string().yup.string().test('is-uuid', '', u => isUUID.v5(u))),
  email: yup.array().min(1).of(yup.string().email()),
  phone: yup.array().min(1).of(yup.string().matches(/^(\d{2})\s\d{4,5}-\d{4}$/)),
});
