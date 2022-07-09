import { prisma } from "@prisma/client";
import axios from "axios";
import prismaClient from '../prisma';
import{sign} from 'jsonwebtoken';
/**
 * Receber code (string) github: acessar o localhost:4000/github para code
 * Recuperar o acess_token do github: usar o code no insomnia fazendo requisição post
 * Recuperar infos do user no github
 * Verificar se o usuario existe no DB
 * ---SIM = Gera um token
 * ---NÃO = Cria no DB gera um token
 * Retornar o token com as infos do user logado
 */
interface IAccessTokenResponse{
    access_token: string
}

interface IUserResponse{
    avatar_url: string,
    login:string,
    id: number,
    name: string
}


class AuthenticateUserService{
    async execute(code: string){ // Receber code (string) github
        const url = 'https://github.com/login/oauth/access_token';
        const {data:accessTokenResponse} =  await axios.post<IAccessTokenResponse>(url, null,{
            params:{
                client_id:process.env.GITHUB_CLIENT_ID,
                client_secret:process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers:{
                "Accept":"application/json"
            }
        });
        //Recuperar infos do user no github
        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers:{
                authorization:`Bearer ${accessTokenResponse.access_token}`
            },
        });

        //---SIM = Gera um token

        const {login, id, avatar_url, name} = response.data;
        
        let user = await prismaClient.user.findFirst({
            where:{
                github_id: id
            }
        })
        if(!user){ //  ---NÃO = Cria no DB gera um token

           user = await prismaClient.user.create({
                data:{
                    github_id: id,
                    login,
                    avatar_url,
                    name
                }
            })
        }

        //criar o token para autenticação do user logado
        const token = sign(
        {
            user:{
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id
            }
        },
        process.env.JWT_SECRET, //criado na Md5 hash generator
        {
            subject: user.id,
            expiresIn: "1d",
        }
        );
        return {token, user}; /* acessar o localhost/github e ir 
        no insomnia para obter o Token e dados do user.
        Retornar o token com as infos do user logado*/
    }
}
export {AuthenticateUserService}