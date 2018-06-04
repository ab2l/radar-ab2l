# radar-ab2l@1.0.0
Radar da AB2L - Associação Brasileira de Lawtechs

API: https://www.getpostman.com/collections/770ef384290804953132
## Instalação
Baixe o Node em [nodejs.org](http://nodejs.org) e o instale, isso se você já não o possuir.

```sh
git clone https://github.com/bipbop/radar-ab2l.git
yarn
yarn run dev -p 1337
```

## Variáveis de Ambiente ###

```bash
export RADAR_AB2L_CLOUDINARY_NAME="radarab2l"
export RADAR_AB2L_CLOUDINARY_KEY="SECRET_KEY"
export RADAR_AB2L_CLOUDINARY_SECRET="SECRET_API_KEY"
export RADAR_AB2L_BIPBOP_APIKEY="6057b71263c21e4ada266c9d4d4da613"
export RADAR_AB2L_DATABASE_DSN="mongodb://localhost:27017/radar-ab2l"
export RADAR_AB2L_ADDRESS_API="https://api.radar.ab2l.org.br"
export RADAR_AB2L_ADDRESS="https://radar.ab2l.org.br"
export RADAR_AB2L_MAILGUN_APIKEY="key-****************************"
export RADAR_AB2L_MAILGUN_DOMAIN="radar.ab2l.org.br"
export RADAR_AB2L_HTTP_PORT="80"
```