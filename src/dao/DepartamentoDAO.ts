import { getRepository, getConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import {GenericDAO} from './GenericDAO';
import { Departamento } from "../entity/Departamento";


export class DepartamentoDAO extends GenericDAO<Departamento> {

    constructor() {
        super(Departamento);
    }

}