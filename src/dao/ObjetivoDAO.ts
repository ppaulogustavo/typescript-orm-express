import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import {GenericDAO} from './GenericDAO';
import { Objetivo } from "../entity/Objetivo";


export class ObjetivoDAO extends GenericDAO<Objetivo> {

    constructor() {
        super(Objetivo);
    }

}