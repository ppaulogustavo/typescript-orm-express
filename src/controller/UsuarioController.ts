import { UsuarioDAO } from './../dao/UsuarioDAO';
import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Usuario} from "../entity/Usuario";
import { Path } from '../express/decorators/Path';
import { HttpMethod } from '../express/HttpMethod';

export class UsuarioController {

    private usuarioRepository = getRepository(Usuario);
    private dao = new UsuarioDAO();

    @Path(HttpMethod.GET)
    async all(request: Request, response: Response, next: NextFunction) {
        return this.usuarioRepository.find();
    }

    async teste(request: Request, response: Response, next: NextFunction) {
        return this.dao.getById(request.params.id);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.usuarioRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.usuarioRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        return this.dao.remove(request.params.id);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.dao.update(request.params.id, request.body);
    }

}