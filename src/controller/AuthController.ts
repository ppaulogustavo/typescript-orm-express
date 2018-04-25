import { authBusiness } from './../business/AuthBusiness';
import * as passport from "passport";
import { Strategy } from "passport-jwt";
import { Request, Response, NextFunction } from "express";
import { Path } from "../express/decorators/Path";
import { HttpMethod } from "../express/HttpMethod";
import { ValidacaoAuth } from '../interfaces/ValidacaoAuth';
import { expressConfigs } from '../express/ExpressManager';

export class AuthController {

    @Path(HttpMethod.POST, "/login")
    public login(req: Request, res: Response) {
        try {
            const iTokenSession = authBusiness.login(req);
            res.status(200).json(iTokenSession);
        } catch (err) {
            res.status(401).json({ "message": "Erro ao se logar", "errors": err });
        }
    }

    @Path(HttpMethod.INTERCEPTOR_ALL, "/*")
    public async autenticar(req: Request, res: Response, next: NextFunction ) {

        if (!req.path.includes("/login")) {
            const validacaoAuth = await authBusiness.autenticar(req);
            const erro = ValidacaoAuth.getErro(validacaoAuth);
    
            if(erro) return res.status(401).json(erro);
            res.append("bearer", validacaoAuth.tokenSession.token);
            expressConfigs.setConfig('user',  validacaoAuth.usuario);
    
            return next();
        }
        next();
    }
}