import yup from 'yup';
import CNPJ from 'cpf_cnpj';
import isUUID from 'is-uuid';

export const description = {
  name: 'Associados AB2L',
  description: 'Lista de associados da AB2L.',
};

export default yup.object().shape({
  img1280by960: yup.string().required().url(),
  caption1280by960: yup.string().required(),
  img96by96: yup.string().required().url(),
  caption96by96: yup.string().required(),

  companyType: yup.string().required().oneOf([
    'todas', 'sa', 'ltda', 'eireli', 'mei',
  ]),
  cnpj: yup.string()
    .required()
    .test('is-cnpj', '', c => CNPJ.isValid(c)),
  url: yup.string().url().required(),
  address: yup.string().required(),
  spokesman: yup.string().required().test('is-uuid', '', u => isUUID.v5(u)),
  categoria: yup.string().required().oneOf([
    'Lawtechs/Legaltechs',
    'Escritório / Departamento Jurídico',
    'Prestadores de Serviço',
    'Institucional',
    'Autônomo',
    'Mantenedores',
  ]),
  logomarca: yup.string().url().required(),
  company: yup.string().required(),
  reference: yup.string().required().test('is-uuid', '', u => isUUID.v5(u)),
  nfe: yup.string().url().required(),
  revenue: yup.string().required().oneOf([
    'Microempresa',
    'Pequena Empresa (Categoria 1)',
    'Pequena Empresa (Categoria 2)',
    'Pequena - Média Empresa',
    'Média Empresa',
    'Grande Empresa',
  ]),
  customers: yup.number().positive().integer(),
  email: yup.array().min(1).of(yup.string().email()),
  employees: yup.array().of(yup.string().yup.string().test('is-uuid', '', u => isUUID.v5(u))),
  phone: yup.array().min(1).of(yup.string().matches(/^(\d{2})\s\d{4,5}-\d{4}$/)),
  biography: yup.string().required().min(256),
  summary: yup.string().required().max(256),
});

// https://www.letras.mus.br/petit-biscuit/problems/
