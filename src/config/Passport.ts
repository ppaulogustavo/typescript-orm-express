import { expressConfigs } from './../express/ExpressManager';
import { ValidacaoAuth } from './../interfaces/ValidacaoAuth';
import { Usuario } from './../entity/Usuario';
import { ValidadorToken } from './../interfaces/ValidadorToken';
import { Request, Response, NextFunction } from 'express';

import * as passportLib from "passport";
import { Strategy } from "passport-jwt";

class Passport {

    public initialize(authStrategy: Strategy) {
        passportLib.use('jwt', authStrategy);
        return passportLib.initialize();
    }

    public autenticar(req: Request, validator: (erro, usuario, info) => ValidacaoAuth ) : Promise<ValidacaoAuth>{
        return new Promise((resolve, reject) => {
            passportLib.authenticate("jwt", { session: false, failWithError: true }, (erro, usuario, info) => {
                try {
                    const validacao = validator(erro, usuario, info);
                    resolve(validacao);
                } catch(erro) {
                    reject(erro);
                }
            })(req);
        });
    }

}

export const passport = new Passport();