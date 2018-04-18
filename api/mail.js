import mailgun from 'mailgun-js';

import config from './config';

export default mailgun(config.mailgun);
