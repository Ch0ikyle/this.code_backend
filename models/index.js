import Sequelize from 'sequelize';
import path from 'path';

import { user } from './user';

const config = require(path.join(__dirname, '..', 'config', 'dbconfig.json'))['codeup'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config  
);

const User = user(sequelize, Sequelize);

export { sequelize, Sequelize, User };  