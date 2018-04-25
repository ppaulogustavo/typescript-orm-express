import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { ObjetivoDAO } from "../dao/ObjetivoDAO";

export class ObjetivoBusiness {

    private dao = new ObjetivoDAO();

    async listarTodos() {
        return this.dao.getAll();
    }

    async getById(id: number) {
        return this.dao.getById(id);
    }

    async save(objetivoDTO: any) {
        return this.dao.insert(objetivoDTO);
    }

    async remove(id: number) {
        return this.dao.remove(id);
    }

    async update(id: number, objetivoDTO: any) {
        return this.dao.update(id, objetivoDTO);
    }

}