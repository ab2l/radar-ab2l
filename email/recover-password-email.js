import urlJoin from 'url-join';

export default ({ bipbopContentRFB, bipbopContentRFBCPF, emailCode }, { address }) => `Olá,

Recebemos um pedido de recuperação de senha.

Empresa: ${bipbopContentRFB.nome}
Responsável: ${bipbopContentRFBCPF.nome}

Para prosseguir clique no endereço abaixo: ${urlJoin(address.site, `/password?c=${encodeURIComponent(emailCode)}`)}

Atenciosamente,
Equipe AB2L.`;
