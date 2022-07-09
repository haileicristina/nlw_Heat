import{Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken';


interface IPayLoad{
    sub: string
}

export function ensureAuthenticated(request: Request, response:Response, next:NextFunction){
    const authToken = request.headers.authorization;
    if(!authToken){
        return response.status(401).json({
            errorCode:'token.invalid',
        })
    }
    //desestruturar deixando a posição [0] que é o Bearer vazia e pegar o token com a variavel token
    const[, token] = authToken.split(" ");

    try{
    //verificar se o token é válido
    //sub é o ID do usuário
   const{ sub } = verify(token, process.env.JWT_SECRET) as IPayLoad
   request.user_id = sub;

   //passar o middle pra frente
   return next();
   
    }catch(err){
        return response.status(401).json({errorCode: 'token.expired'})
    }
}