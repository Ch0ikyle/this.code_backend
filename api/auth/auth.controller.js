import crypto from 'crypto';
import { User } from '../../models';
import { generateToken, decodeToken }from '../../lib/token.js';
// .env 파일의 환경 변수 불러오기
import dotenv from 'dotenv';
dotenv.config();

export const Register = async (ctx) => {

    // 아이디 중복체크
    // 사용자가 입력한 id와 동일한 id가 데이터베이스에 있는지 검사하고, 만약 있다면 exist에 저장함
    const exist = await User.findAll({
        where: {
            id : ctx.request.body.id
        }
    });

    // exist의 길이가 0이 아니라면, 중복된 아이디가 있다는 뜻
    // 따라서 만약 중복된 아이디가 있다면, 400 에러코드를 전송하고, body에 002라는 내용을 담아서 보냄
    if(exist.length){
        console.log(`이미 존재하는 아이디입니다. / 입력된 아이디 : ${ctx.request.body.id}`);

        ctx.status = 400;
        ctx.body = false;
        return;
    }

    // 데이터베이스에 저장할 내용을 정리하는 코드
    const id = ctx.request.body.id;

    const array = new Array(10).fill(0);

    const correct = {
        "correct" : array
    }
    
    // 데이터베이스에 값을 저장함.
    User.create({
        "id" : id,
        "password" : ctx.request.body.password,
        "username" : ctx.request.body.username,
        "description" : ctx.request.body.description,
        "correctInfo" : JSON.stringify(correct),
        "point" : 0
    }).then((result) => {
        console.log(`새로운 회원이 저장되었습니다. / 아이디 : ${id}`);
        ctx.body = true;
    }).catch((err) => {
        console.log(`데이터베이스 저장 중 에러 발생`);
        ctx.body = false;
        return;
    });

    ctx.body = true;    
}

export const Login = async (ctx) => {

    // 데이터베이스에 해당하는 아이디가 있는지 검사합니다.
    const founded = await User.findAll({
        where: {
            id : ctx.request.body.id
        }
    });

    if(!founded.length){
        console.log(`Login - 존재하지 않는 계정입니다. / 입력된 아이디 : ${ctx.request.body.id}`);
        ctx.status = 400;
        ctx.body = false;
        return;
    }

    if(founded[0].password != ctx.request.body.password){
        console.log(`Login - 비밀번호를 틀렸습니다.`);
        ctx.status = 400;
        ctx.body = false;
        return;
    }

    const payload = {
        id : founded[0].id
    };

    let token = null;
    token = await generateToken(payload);

    console.log(token);

    ctx.body = {
        token : token
    };

    console.log(`로그인에 성공하였습니다.`)
}

export const showInfo = async (ctx) => {
    const token = ctx.header.token;
    const decoded = await decodeToken(token);

    const user = await User.findAll({
        where : {
            id : decoded.id
        }
    });

    ctx.body = {
        "username" : user[0].username,
        "description" : user[0].description
    }
}

export const Ranking = async (ctx) => {
    const user = await User.findAll({
        order : [
            ['point', 'DESC']
        ]
    });

    let deliver = new Array();
    user.forEach(element => {
        deliver.push({
            "username" : element.username,
            "point" : element.point
        });
    });

    ctx.body = deliver;
}