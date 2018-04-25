import { NextFunction } from 'express';
import { passport } from './../config/Passport';
import { ValidacaoAuth } from './../interfaces/ValidacaoAuth';
import { AuthPayload } from './../interfaces/AuthPayload';
import { Response } from 'express';
import { ITokenSession } from './../interfaces/ITokenSession';
import { Request } from 'express';
import { Usuario } from './../entity/Usuario';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import * as moment from "moment";
import * as jwt from "jwt-simple";
import "express-validator";
 

const mock = [new Usuario("wellington", "1234")];

class AuthBusiness {

    public constroiToken = (user: Usuario): ITokenSession => {
        let expires = moment().add({ hours: 1 }).unix();
        let token = jwt.encode({
            exp: expires,
            login: user.login
        }, process.env.JWT_SECRET);

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            usuario: user.login
        };
    }

    public login(req: Request) : ITokenSession {
        req.checkBody("login", "Favor preencher usuário").notEmpty();
        req.checkBody("senha", "Favor preencher senha").notEmpty();

        const errors = req.validationErrors();
        if(errors) throw errors;

        const user = mock.find(u => u.login == req.body.login);
        if(!user) throw "Usuário não encontrado";

        if(user.senha != req.body.senha) throw "senha inválida";

        return this.constroiToken(req.body);
    }

    public validaUsuarioToken(req: Request, payload: AuthPayload, done: VerifiedCallback) : void {
        const user = mock.find(u => u.login == payload.login);
        if (user === null) {
            return done(null, false, { message: "O usuário do token não foi encontrado" });
        }

        return done(null, { id: user.id, login: user.login });
    }

    public constroiStrategy() : Strategy {
        const params = {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            passReqToCallback: true
        };

        return new Strategy(params, this.validaUsuarioToken);
    }

    public validarToken(erro: Error, usuario: Usuario, info: any) : ValidacaoAuth {
        
        if (erro) return {errorsValidacaoUsuario: erro.message, usuario};
        if (!usuario) {
            if (info.name === "TokenExpiredError") {
                return {errorsValidacaoAuth: "Token expirou", usuario};
            } else {
                return {errorsValidacaoAuth: info.message, usuario}
            }
        }
        return {tokenSession: this.constroiToken(usuario), usuario};
    }

    public autenticar(req: Request) : Promise<ValidacaoAuth> {
        return passport.autenticar(req, this.validarToken.bind(this));
    };

}

export const authBusiness = new AuthBusiness();