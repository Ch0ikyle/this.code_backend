import crypto from 'crypto';
import { User, Problem, Answer, ProblemLog } from '../../models';
import { decodeToken } from '../../lib/token';
import request from 'request-promise';
// .env 파일의 환경 변수 불러오기
import dotenv from 'dotenv';
dotenv.config();

export const ListProblem = async (ctx) => {
    const token = ctx.header.token;
    const decoded = await decodeToken(token);

    const user = await User.findAll({
        where : {
            id : decoded.id
        }
    });

    const corrected = JSON.parse(user[0].correctInfo);

    const list = await Problem.findAll();

    let list_name = new Array();
    
    list.forEach(element => {
        list_name.push(element.title); 
    });

    ctx.body = {
        "name" : list_name,
        "user" : corrected.correct
    };
}

export const DetailProblem = async (ctx) => {
    
    const problem = await Problem.findAll({
        where : {
            i : ctx.request.body.index
        }
    });

    ctx.body = {
        "title" : problem[0].title,
        "description" : problem[0].description,
        "input" : problem[0].input,
        "output" : problem[0].output,
        "exInput" : problem[0].exInput,
        "exOutput" : problem[0].exOutput
    }
}

export const AnswerCheck = async (ctx) => {
    const token = ctx.header.token;
    const decoded = await decodeToken(token);

    const index = ctx.request.body.index;

    const answer = await Answer.findAll({
        where : {
            "index" : index
        }
    });

    const testcase = JSON.parse(answer[0].testcase);
    const testanswer = JSON.parse(answer[0].answer);

    var isCorrect;

    for(var i=1; i<5;i++){

        let jsonData = {
            "lang": ctx.request.body.lang,
            "code": ctx.request.body.code,
            "input": testcase[i]
        }

        let fi = i;
        await request.post({
            headers : {'Content-type' : 'application/json'},
            url : "http://192.168.161.167:3001/runcode",
            body : jsonData,
            json:true
        }, (error, response, body) => {
            if(body.output == testanswer[fi]){
                isCorrect = true;
            }else{
                isCorrect = false;
            }

        });        
    }

    if(isCorrect){
        await User.findOne({
            where : {
                id : decoded.id
            }
        }).then(user => {
            const info = JSON.parse(user.correctInfo);
            if(info.correct[index-1]){
                console.log(`이미 맞춰놓고 왜 또 지랄이세요 시발련아`);
                return;
            }

            info.correct[index-1] = 1;

            user.update({
                "correctInfo" : JSON.stringify(info),
                "point" : user.point + 1
            });

            ProblemLog.create({
                "username" : user.username,
                "problemnum" : index,
                "isCorrect" : true
            });

        });

        ctx.body = "true";
        return;
    }

    await User.findOne({
        where : { id : decoded.id}
    }).then( user => {
        ProblemLog.create({
            "username" : user.username,
            "problemnum" : index,
            "isCorrect" : false
        });

        ctx.body = "false";
    });
}

export const ShowLog = async (ctx) => {
    const logData = await ProblemLog.findAll();

    const sentence = new Array();

    logData.forEach(element => {
        sentence.push({
            "username" : element.username,
            "problemnum" : element.problemnum,
            "isCorrect" : element.isCorrect
        });
    });

    ctx.body = sentence;
}