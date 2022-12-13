"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
    const authToken = request.headers.authorization;
    if (!authToken) {
        return response.status(401).json({
            errorCode: 'token.invalid',
        });
    }
    //desestruturar deixando a posição [0] que é o Bearer vazia e pegar o token com a variavel token
    const [, token] = authToken.split(" ");
    try {
        //verificar se o token é válido
        //sub é o ID do usuário
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        request.user_id = sub;
        //passar o middle pra frente
        return next();
    }
    catch (err) {
        return response.status(401).json({ errorCode: 'token.expired' });
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
