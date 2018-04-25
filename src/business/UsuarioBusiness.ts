import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Usuario} from "../entity/Usuario";
import {UsuarioDAO} from '../dao/UsuarioDAO';

export class UsuarioBusiness {

    private dao = new UsuarioDAO();

    async listarTodos() {
        return this.dao.getAll();
    }

    async getById(id: number) {
        return this.dao.getById(id);
    }

    async getByLogin(login: string) {
        return this.dao.getByLogin(login);
    }

    async save(usuarioDTO: any) {
        return this.dao.insert(usuarioDTO);
    }

    async remove(id: number) {
        return this.dao.remove(id);
    }

    async update(id: number, usuarioDTO: any) {
        return this.dao.update(id, usuarioDTO);
    }

}