import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Departamento} from "../entity/Departamento";
import { DepartamentoDAO } from "../dao/DepartamentoDAO";

export class DepartamentoBusiness {

    private dao = new DepartamentoDAO();

    async listarTodos() {
        return this.dao.getAll();
    }

    async getById(id: number) {
        return this.dao.getById(id);
    }

    async save(departamentoDTO: any) {
        return this.dao.insert(departamentoDTO);
    }

    async remove(id: number) {
        return this.dao.remove(id);
    }

    async update(id: number, departamentoDTO: any) {
        return this.dao.update(id, departamentoDTO);
    }

}