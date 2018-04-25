import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import {GenericDAO} from './GenericDAO';
import { Usuario } from "../entity/Usuario";


export class UsuarioDAO extends GenericDAO<Usuario> {

    constructor() {
        super(Usuario);
    }

}