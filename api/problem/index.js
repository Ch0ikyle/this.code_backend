import Router from 'koa-router';
import { ListProblem } from './problem.controller';

const problem = new Router();

problem.get('/getList', ListProblem);
//problem.post('/register', Register);

export default problem;