import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { ConceitoDAO } from "../dao/ConceitoDAO";

export class ConceitoBusiness {

    private dao = new ConceitoDAO();

    async listarTodos() {
        return this.dao.getAll();
    }

    async getById(id: number) {
        return this.dao.getById(id);
    }

    async save(conceitoDTO: any) {
        return this.dao.insert(conceitoDTO);
    }

    async remove(id: number) {
        return this.dao.remove(id);
    }

    async update(id: number, conceitoDTO: any) {
        return this.dao.update(id, conceitoDTO);
    }

}