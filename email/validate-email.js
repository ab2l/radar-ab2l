import urlJoin from 'url-join';

export default ({ bipbopContentRFB, bipbopContentRFBCPF, emailCode }, { address }) => `Olá,

Recebemos seu cadastro aqui na AB2L.

Empresa: ${bipbopContentRFB.nome}
Responsável: ${bipbopContentRFBCPF.nome}

Agora precisamos verificar também seu endereço de e-mail para que você possa fazer parte de nossa comunidade de legaltechs e lawtechs.

Clique no endereços abaixo: ${urlJoin(address.site, `/validate?c=${encodeURIComponent(emailCode)}`)}

Atenciosamente,
Equipe AB2L.`;
