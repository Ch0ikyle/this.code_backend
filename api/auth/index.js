import Router from 'koa-router';
import { Register, Login, showInfo } from './auth.controller';

const auth = new Router();

auth.post('/register', Register);
auth.post('/login', Login);
auth.get('/showUser', showInfo);

export default auth;