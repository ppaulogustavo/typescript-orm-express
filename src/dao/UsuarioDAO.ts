import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import {GenericDAO} from './GenericDAO';
import { Usuario } from "../entity/Usuario";


export class UsuarioDAO extends GenericDAO<Usuario> {

    constructor() {
        super(Usuario);
    }

    async getByLogin(login: string) {
        return await this.repository.createQueryBuilder('e')
            .where('e.login = :login', {login: login})
            .getOne();
    }

}