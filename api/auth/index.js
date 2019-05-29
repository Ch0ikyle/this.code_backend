import Router from 'koa-router';
import { Register, Login, showInfo, Ranking } from './auth.controller';

const auth = new Router();

auth.post('/register', Register);
auth.post('/login', Login);
auth.get('/showUser', showInfo);
auth.get('/ranking', Ranking);

export default auth;