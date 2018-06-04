/* eslint no-unused-vars: 0 */
/* eslint no-console: 0 */

import fs from 'fs';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import get from 'lodash/get';
import Base from 'nano-base';
import express from 'express';

import config from './config';
import companyRoute from './routes/company';

const app = express();
const base = Base(config);

const accessLog = path.join(__dirname, '..', 'logs', 'access.log');
const accessContent = fs.createWriteStream(accessLog, { flags: 'a' });

app.use(cors({
  allowedHeaders: ['Content-Type', 'X-Token'],
}));

app.use(morgan('combined', { stream: accessContent }));

app.use('/company', companyRoute);

app.use((err, req, res, next) => {
  res.status(500).json(err.message);
});

const httpPort = get(base, 'http.port', 3000);
app.listen(httpPort, () => console.log(`A API da AB2L escuta na porta ${httpPort}, escrevendo logs em ${accessLog}.`));
