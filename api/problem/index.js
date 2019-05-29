import Router from 'koa-router';
import { ListProblem, DetailProblem } from './problem.controller';

const problem = new Router();

problem.get('/getList', ListProblem);
problem.post('/detail', DetailProblem);
//problem.post('/register', Register);

export default problem;