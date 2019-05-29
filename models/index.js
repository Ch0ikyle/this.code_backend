import Sequelize from 'sequelize';
import path from 'path';

import { user } from './user';
import { problem } from './problem';
import { answer } from './answer';
import { problemlog } from './problemlog';

const config = require(path.join(__dirname, '..', 'config', 'dbconfig.json'))['codeup'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config  
);

const User = user(sequelize, Sequelize);
const Problem = problem(sequelize, Sequelize);
const Answer = answer(sequelize, Sequelize);
const ProblemLog = problemlog(sequelize, Sequelize);

export { sequelize, Sequelize, User, Problem, Answer, ProblemLog };  