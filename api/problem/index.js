import Router from 'koa-router';
import { ListProblem, DetailProblem, AnswerCheck, ShowLog } from './problem.controller';

const problem = new Router();

problem.get('/getList', ListProblem);
problem.post('/detail', DetailProblem);
problem.post('/checkAnswer', AnswerCheck);
problem.get('/showLog', ShowLog);
//problem.post('/register', Register);

export default problem;