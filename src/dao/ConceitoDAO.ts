import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import {GenericDAO} from './GenericDAO';
import { Conceito } from "../entity/Conceito";


export class ConceitoDAO extends GenericDAO<Conceito> {

    constructor() {
        super(Conceito);
    }

}