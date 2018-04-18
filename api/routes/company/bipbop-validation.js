import _ from 'lodash';
import config from '../../config';

const BIPBOP = require('bipbop-webservice');

const { apiKey } = config.bipbop;
const webService = new BIPBOP.WebService(apiKey);

function checkRFBContent(objectResponse) {
  return new Promise((accept, reject) => {
    const errorMessage = BIPBOP.get(objectResponse, 'BPQL.header.exception');
    if (errorMessage) {
      return reject(new Error(errorMessage));
    }
    return accept(BIPBOP.get(objectResponse, 'BPQL.body.RFB'));
  });
}

function validateRFBParameters(objectKey) {
  return fetchResponse => fetchResponse.text()
    .then(text => BIPBOP.WebService.parse(text))
    .then(content => checkRFBContent(content))
    .then(content => ({ [objectKey]: content }));
}

function bipbopValidateCNPJ(data) {
  const { cnpj } = data;
  return webService.request("SELECT FROM 'RFB'.'CERTIDAO'", { documento: cnpj })
    .then(validateRFBParameters('bipbopContentRFB'));
}

function bipbopValidateCPF(data) {
  const { cpf, birthday } = data;
  return webService.request("SELECT FROM 'RFB'.'CERTIDAO'", {
    documento: cpf,
    nascimento: birthday,
  }).then(validateRFBParameters('bipbopContentRFBCPF'));
}

function validateCompanyMember(data) {
  const socios = _.get(data, 'bipbopContentRFB.socios.socio');
  const nome = _.get(data, 'bipbopContentRFBCPF.nome');

  if (!socios) return data;

  if (typeof socios !== 'string') {
    const idx = socios.indexOf(nome);
    if (idx === -1) {
      throw new Error('O CPF informado não faz parte do CNPJ informado');
    }
    return data;
  }

  if (typeof socios === 'string') {
    if (nome !== socios) {
      throw new Error('O CPF informado não faz parte do CNPJ informado');
    }
    return data;
  }

  return data;
}

export default d => Promise.resolve(d)
  .then(data => Promise.all([Promise.resolve(data),
    bipbopValidateCNPJ(data), bipbopValidateCPF(data)]))
  .then(data => Object.assign(...data))
  .then(data => validateCompanyMember(data));
