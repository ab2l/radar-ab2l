import mongoist from 'mongoist';

import config from './config';

export default mongoist(config.database);
