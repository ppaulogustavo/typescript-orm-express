import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Usuario} from "../entity/Usuario";
import {UsuarioDAO} from '../dao/UsuarioDAO';

export class UsuarioBusiness {

    private usuarioRepository = getRepository(Usuario);
    private dao = new UsuarioDAO();

    async listarTodos() {
        return this.usuarioRepository.find();
    }

    async getById(id: number) {
        return this.dao.getById(id);
        //return this.usuarioRepository.findOne(request.params.id);
    }

    async save(usuarioDTO: any) {
        return this.usuarioRepository.save(usuarioDTO);
    }

    async remove(id: number) {
        return this.dao.remove(id);
    }

    async update(id: number, usuarioDTO: any) {
        return this.dao.update(id, usuarioDTO);
    }

}