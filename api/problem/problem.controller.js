import crypto from 'crypto';
import { User, Problem } from '../../models';
// .env 파일의 환경 변수 불러오기
import dotenv from 'dotenv';
dotenv.config();

export const ListProblem = async (ctx) => {

    const list = await Problem.findAll();

    let list_name = new Array();
    
    list.forEach(element => {
        list_name.push(element.title); 
    });

    ctx.body = {
        "name" : list_name
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